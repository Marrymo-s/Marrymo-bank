package site.marrymo.restapi.global.service;

import java.io.IOException;

import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.marrymo.restapi.moneygift_history.dto.response.MoneygiftGetResponse;
import site.marrymo.restapi.moneygift_history.service.MoneygiftService;
import site.marrymo.restapi.user.entity.User;
import site.marrymo.restapi.user.service.UserService;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ExcelService {

	private final MoneygiftService moneygiftService;

	//	public void getMoneygiftExcel(User user, HttpServletResponse res) throws IOException {
	public void getMoneygiftExcel(HttpServletResponse res) throws IOException {
		Workbook workbook = new XSSFWorkbook();

		User user = User.builder()
			.isBrideOnce(true)
			.isGroomOnce(true)
			.build();
		// 시트를 생성할지 여부를 결정하기 위한 User 객체의 bride와 groom 값 검사
		if (user.getIsBrideOnce()) {
			// 신부를 위한 시트 생성
			createSheetForUser(workbook, "신부 축의금 내역", user);
		}

		if (user.getIsGroomOnce()) {
			// 신랑을 위한 시트 생성
			createSheetForUser(workbook, "신랑 축의금 내역", user);
		}
		// 파일 다운로드 로직
		String fileName = "moneygift_sheet_" + user.getUserCode() + "_by_marrymo";
		res.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		res.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + ".xlsx\"");
		try (ServletOutputStream servletOutputStream = res.getOutputStream()) {
			workbook.write(servletOutputStream);
		} finally {
			workbook.close();
		}
	}

	private void createSheetForUser(Workbook workbook, String sheetName, User user) {
		Sheet sheet = workbook.createSheet(sheetName);
		sheet.setDefaultColumnWidth(8);
		/**
		 * header font style
		 */
		XSSFFont headerXSSFFont = (XSSFFont)workbook.createFont();
		headerXSSFFont.setColor(new XSSFColor(new byte[] {(byte)255, (byte)255, (byte)255}));

		/**
		 * header cell style
		 */
		XSSFCellStyle headerXssfCellStyle = (XSSFCellStyle)workbook.createCellStyle();

		// 테두리 설정
		headerXssfCellStyle.setBorderLeft(BorderStyle.THIN);
		headerXssfCellStyle.setBorderRight(BorderStyle.THIN);
		headerXssfCellStyle.setBorderTop(BorderStyle.THIN);
		headerXssfCellStyle.setBorderBottom(BorderStyle.THIN);

		// 배경 설정
		headerXssfCellStyle.setFillForegroundColor(new XSSFColor(new byte[] {(byte)34, (byte)37, (byte)41}));
		headerXssfCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		headerXssfCellStyle.setFont(headerXSSFFont);

		/**
		 * body cell style
		 */
		XSSFCellStyle bodyXssfCellStyle = (XSSFCellStyle)workbook.createCellStyle();

		// 테두리 설정
		bodyXssfCellStyle.setBorderLeft(BorderStyle.THIN);
		bodyXssfCellStyle.setBorderRight(BorderStyle.THIN);
		bodyXssfCellStyle.setBorderTop(BorderStyle.THIN);
		bodyXssfCellStyle.setBorderBottom(BorderStyle.THIN);

		/**
		 * header data
		 */

		Row row = sheet.createRow(3);
		Cell title = row.createCell(6);
		title.setCellValue(sheetName);

		row = sheet.createRow(5);
		Cell money = row.createCell(2);
		money.setCellValue("축의금");
		Cell wishitem = row.createCell(8);
		wishitem.setCellValue("위시리스트");

		Row headerRow = null;
		Cell headerCell = null;

		String[] headerData = new String[] {"순번", "관계", "이름", "금액"};
		headerRow = sheet.createRow(7);
		headerCell = headerRow.createCell(8);
		headerCell.setCellValue("품목");
		headerCell.setCellStyle(headerXssfCellStyle); // 스타일 추가
		for (int i = 0; i < headerData.length; i++) {
			headerCell = headerRow.createCell(i + 2);
			headerCell.setCellValue(headerData[i]); // 데이터 추가
			headerCell.setCellStyle(headerXssfCellStyle); // 스타일 추가
			headerCell = headerRow.createCell(i + 9);
			headerCell.setCellValue(headerData[i]); // 데이터 추가
			headerCell.setCellStyle(headerXssfCellStyle); // 스타일 추가
		}

		/**
		 * body data
		 */
		MoneygiftGetResponse response = moneygiftService.getMoneygiftInfo(user.getUserSequence());
		// String bodyDatass[][] = new String[][] {
		// 	{"첫번째 행 첫번째 데이터", "첫번째 행 두번째 데이터", "첫번째 행 세번째 데이터"},
		// 	{"두번째 행 첫번째 데이터", "두번째 행 두번째 데이터", "두번째 행 세번째 데이터"},
		// 	{"세번째 행 첫번째 데이터", "세번째 행 두번째 데이터", "세번째 행 세번째 데이터"},
		// 	{"네번째 행 첫번째 데이터", "네번째 행 두번째 데이터", "네번째 행 세번째 데이터"}
		// };
		//
		// Row bodyRow = null;
		// Cell bodyCell = null;
		//
		// for (String[] bodyDatas : bodyDatass) {
		// 	bodyRow = sheet.createRow(rowCount++);
		//
		// 	for (int i = 0; i < bodyDatas.length; i++) {
		// 		bodyCell = bodyRow.createCell(i);
		// 		bodyCell.setCellValue(bodyDatas[i]); // 데이터 추가
		// 		bodyCell.setCellStyle(bodyXssfCellStyle); // 스타일 추가
		// 	}
		// }
	}
}
