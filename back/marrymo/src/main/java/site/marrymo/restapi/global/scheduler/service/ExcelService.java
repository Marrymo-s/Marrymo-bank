package site.marrymo.restapi.global.scheduler.service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.NumberFormat;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

import com.amazonaws.services.s3.model.ObjectMetadata;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.marrymo.restapi.global.s3.service.AwsS3Service;
import site.marrymo.restapi.moneygift_history.dto.Type;
import site.marrymo.restapi.moneygift_history.dto.response.MoneyInfo;
import site.marrymo.restapi.moneygift_history.dto.response.MoneygiftGetResponse;
import site.marrymo.restapi.moneygift_history.service.MoneygiftService;
import site.marrymo.restapi.user.dto.UserDTO;
import site.marrymo.restapi.user.repository.UserRepository;
import site.marrymo.restapi.wishitem.dto.response.WishItemDetailResponse;
import site.marrymo.restapi.wishitem.service.WishItemService;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ExcelService {

	private final MoneygiftService moneygiftService;
	private final WishItemService wishItemService;
	private final UserRepository userRepository;
	private final AwsS3Service awsS3Service;

	public String moneygiftExcelURL(UserDTO user) throws IOException {
		Workbook workbook = new XSSFWorkbook();

		createSheetForUser(workbook, "신부 축의금 내역", user);
		createSheetForUser(workbook, "신랑 축의금 내역", user);

		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		workbook.write(outputStream);

		ByteArrayInputStream inputStream = new ByteArrayInputStream(outputStream.toByteArray());

		ObjectMetadata metadata = new ObjectMetadata();
		metadata.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		metadata.setContentLength(outputStream.size());
		String fileName = "marrymo_" + user.getUserCode();

		String fileUrl = awsS3Service.uploadExcelFile("excel", inputStream, fileName, metadata);

		outputStream.close();
		workbook.close();

		return fileUrl;
	}

	private void createSheetForUser(Workbook workbook, String sheetName, UserDTO user) {
		Sheet sheet = workbook.createSheet(sheetName);
		sheet.setDefaultColumnWidth(9);
		/**
		 * header font style
		 */
		XSSFFont headerXSSFFont = (XSSFFont)workbook.createFont();

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
		headerXssfCellStyle.setFont(headerXSSFFont);
		headerXssfCellStyle.setFillForegroundColor(new XSSFColor(new byte[] {(byte)255, (byte)255, (byte)0}));
		headerXssfCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		/**
		 * body cell style
		 */
		XSSFCellStyle bodyXssfCellStyle = (XSSFCellStyle)workbook.createCellStyle();

		// 테두리 설정
		bodyXssfCellStyle.setBorderLeft(BorderStyle.THIN);
		bodyXssfCellStyle.setBorderRight(BorderStyle.THIN);
		bodyXssfCellStyle.setBorderTop(BorderStyle.THIN);
		bodyXssfCellStyle.setBorderBottom(BorderStyle.THIN);

		// 글꼴 설정
		XSSFFont titleFont = (XSSFFont)workbook.createFont();
		titleFont.setFontHeightInPoints((short)20); // 글꼴 크기를 20으로 설정

		// 셀 스타일 설정
		XSSFCellStyle titleStyle = (XSSFCellStyle)workbook.createCellStyle();
		titleStyle.setFont(titleFont);
		/**
		 * header data
		 */

		Row row = sheet.createRow(3);
		Cell title = row.createCell(6);
		title.setCellValue(sheetName);
		title.setCellStyle(titleStyle);

		row = sheet.createRow(6);
		Cell money = row.createCell(9);
		money.setCellValue("축의금");
		money.setCellStyle(headerXssfCellStyle);
		Cell wishList = row.createCell(2);
		wishList.setCellValue("위시리스트");
		wishList.setCellStyle(headerXssfCellStyle);

		Row headerRow = null;
		Cell headerCell = null;

		String[] headerData = new String[] {"순번", "관계", "이름", "금액"};
		headerRow = sheet.createRow(7);
		headerCell = headerRow.createCell(2);
		headerCell.setCellValue("품목");
		headerCell.setCellStyle(headerXssfCellStyle); // 스타일 추가
		for (int i = 0; i < headerData.length; i++) {
			headerCell = headerRow.createCell(i + 3);
			headerCell.setCellValue(headerData[i]); // 데이터 추가
			headerCell.setCellStyle(headerXssfCellStyle); // 스타일 추가
			headerCell = headerRow.createCell(i + 9);
			headerCell.setCellValue(headerData[i]); // 데이터 추가
			headerCell.setCellStyle(headerXssfCellStyle); // 스타일 추가
		}

		/**
		 * body data
		 */
		MoneygiftGetResponse response = moneygiftService.getMoneygiftInfo(user);
		NumberFormat formatter = NumberFormat.getNumberInstance();
		String totalSum = formatter.format(response.getTotalSum());
		String withListItemSum = formatter.format(response.getWishItemListSum());
		String moneygiftSum = formatter.format(response.getMoneygiftListSum());

		List<MoneyInfo> moneyList = response.getMoneyList();
		List<MoneygiftData> moneygiftList = moneyList.stream()
			.filter(moneygift -> moneygift.getGuestType().equals(sheetName.substring(0, 2)))
			.filter(moneygift -> moneygift.getType() == Type.CASH)
			.map(moneygift -> MoneygiftData.builder()
				.relationship(moneygift.getRelationship())
				.sender(moneygift.getSender())
				.amount(moneygift.getAmount())
				.build()
			)
			.toList();

		int moneygiftIndex = 8;
		Long moneygiftAmount = 0L;
		Row moneygiftRow = null;
		Cell moneygiftCell = null;

		for (MoneygiftData data : moneygiftList) {
			moneygiftRow = sheet.createRow(moneygiftIndex++);

			moneygiftCell = moneygiftRow.createCell(9);
			moneygiftCell.setCellValue(moneygiftIndex - 8);
			moneygiftCell.setCellStyle(bodyXssfCellStyle);

			moneygiftCell = moneygiftRow.createCell(10);
			moneygiftCell.setCellValue(data.getRelationship());
			moneygiftCell.setCellStyle(bodyXssfCellStyle);

			moneygiftCell = moneygiftRow.createCell(11);
			moneygiftCell.setCellValue(data.getSender());
			moneygiftCell.setCellStyle(bodyXssfCellStyle);

			moneygiftCell = moneygiftRow.createCell(12);
			moneygiftCell.setCellValue(formatter.format(data.getAmount()));
			moneygiftAmount += data.getAmount();
			moneygiftCell.setCellStyle(bodyXssfCellStyle);

		}

		String[] moneygiftTotal = {"", "", "합계", formatter.format(moneygiftAmount)};
		moneygiftRow = sheet.createRow(moneygiftIndex);
		for (int i = 0; i < moneygiftTotal.length; i++) {
			moneygiftCell = moneygiftRow.createCell(9 + i);
			moneygiftCell.setCellValue(moneygiftTotal[i]);
			moneygiftCell.setCellStyle(headerXssfCellStyle);
		}

		Map<Long, List<WishItemData>> wishitemList = moneyList.stream()
			.filter(wishitem -> wishitem.getGuestType().equals(sheetName.substring(0, 2)))
			.filter(wishitem -> wishitem.getType() == Type.ITEM)
			.sorted(Comparator.comparing(MoneyInfo::getWishItemSequence))
			.map(wishitem -> WishItemData.builder()
				.wishItemSequence(wishitem.getWishItemSequence())
				.relationship(wishitem.getRelationship())
				.sender(wishitem.getSender())
				.amount(wishitem.getAmount())
				.build()
			)
			.collect(Collectors.groupingBy(WishItemData::getWishItemSequence));

		int wishitemIndex = 8;
		Long wishListAmount = 0L;
		Row wishitemRow = null;
		Cell wishitemCell = null;

		for (Map.Entry<Long, List<WishItemData>> wishlist : wishitemList.entrySet()) {
			WishItemDetailResponse wishItemDetail = wishItemService.getWishItemDetail(user.getUserCode(),
				wishlist.getKey());
			String wishItemName = wishItemDetail.getName();
			String wishItemPrice = formatter.format(wishItemDetail.getPrice());
			List<WishItemData> list = wishlist.getValue();
			wishitemRow = sheet.getRow(wishitemIndex);
			if (wishitemRow == null) {
				wishitemRow = sheet.createRow(wishitemIndex);
			}
			wishitemCell = wishitemRow.createCell(2);
			wishitemCell.setCellValue(wishItemName);
			wishitemCell.setCellStyle(bodyXssfCellStyle);
			wishitemCell = wishitemRow.createCell(6);
			wishitemCell.setCellValue(wishItemPrice);
			wishitemCell.setCellStyle(bodyXssfCellStyle);
			wishitemIndex++;
			Long wishitemAmount = 0L;
			Long sequence = 1L;
			for (WishItemData data : list) {
				wishitemRow = sheet.getRow(wishitemIndex);
				if (wishitemRow == null)
					wishitemRow = sheet.createRow(wishitemIndex);

				wishitemCell = wishitemRow.createCell(3);
				wishitemCell.setCellValue(sequence++);
				wishitemCell.setCellStyle(bodyXssfCellStyle);

				wishitemCell = wishitemRow.createCell(4);
				wishitemCell.setCellValue(data.getRelationship());
				wishitemCell.setCellStyle(bodyXssfCellStyle);

				wishitemCell = wishitemRow.createCell(5);
				wishitemCell.setCellValue(data.getSender());
				wishitemCell.setCellStyle(bodyXssfCellStyle);

				wishitemCell = wishitemRow.createCell(6);
				wishitemCell.setCellValue(formatter.format(data.getAmount()));
				wishitemCell.setCellStyle(bodyXssfCellStyle);

				wishitemAmount += data.getAmount();
				wishitemIndex++;
			}

			wishListAmount += wishitemAmount;
			String[] wishitemTotal = {"", "", "누계", formatter.format(wishitemAmount)};
			wishitemRow = sheet.getRow(wishitemIndex);
			if (wishitemRow == null)
				wishitemRow = sheet.createRow(wishitemIndex);
			for (int i = 0; i < moneygiftTotal.length; i++) {
				wishitemCell = wishitemRow.createCell(3 + i);
				wishitemCell.setCellValue(wishitemTotal[i]);
				wishitemCell.setCellStyle(headerXssfCellStyle);
			}
			wishitemIndex++;
		}

		String[] wishitemTotal = {"", "", "합계", formatter.format(wishListAmount)};
		wishitemRow = sheet.getRow(wishitemIndex);
		if (wishitemRow == null)
			wishitemRow = sheet.createRow(wishitemIndex);
		for (int i = 0; i < moneygiftTotal.length; i++) {
			wishitemCell = wishitemRow.createCell(3 + i);
			wishitemCell.setCellValue(wishitemTotal[i]);
			wishitemCell.setCellStyle(bodyXssfCellStyle);
		}

		String[] statistics = new String[] {"구분", "총액"};
		String[] categories = new String[] {"축의금", "위시리스트", "합계"};
		String[] totalAmounts = new String[] {moneygiftSum, withListItemSum, totalSum};

		Row totalRow = null;
		Cell totalCell = null;

		totalRow = sheet.getRow(7);
		for (int i = 0; i < statistics.length; i++) {
			totalCell = totalRow.createCell(i + 15);
			totalCell.setCellValue(statistics[i]);
			totalCell.setCellStyle(headerXssfCellStyle);
		}

		for (int i = 0; i < categories.length; i++) {
			totalRow = sheet.getRow(8 + i);
			if (totalRow == null)
				totalRow = sheet.createRow(8 + i);
			totalCell = totalRow.createCell(15);
			totalCell.setCellValue(categories[i]);
			totalCell.setCellStyle(bodyXssfCellStyle);
			totalCell = totalRow.createCell(16);
			totalCell.setCellValue(totalAmounts[i]);
			totalCell.setCellStyle(bodyXssfCellStyle);
		}
		totalRow = sheet.getRow(11);
		if (totalRow == null)
			totalRow = sheet.createRow(11);
		totalCell = totalRow.createCell(16);
		totalCell.setCellValue("(부부 합계)");
	}

	@Builder
	@Getter
	@AllArgsConstructor
	public static class MoneygiftData {
		private String relationship;
		private String sender;
		private Integer amount;
	}

	@Builder
	@Getter
	@AllArgsConstructor
	public static class WishItemData {
		private Long wishItemSequence;
		private String relationship;
		private String sender;
		private Integer amount;
	}
}
