export interface signupRequest {
  groomName: string,
  brideName: string,
  groomContact: string,
  brideContact: string,
  weddingDate: LocalDate,
  weddingTime: LocalTime,
  location: string,
  email: string,
  groomFather: string,
  groomMother: string,
  brideFather: string,
  brideMother: string,
  imgUrl: List<object>
}