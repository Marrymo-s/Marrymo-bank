export interface signupRequest {
  groomName: String,
  brideName: String,
  groomContact: String,
  brideContact: String,
  weddingDate: LocalDate,
  weddingTime: LocalTime,
  location: String,
  email: String,
  groomFather: String,
  groomMother: String,
  brideFather: String,
  brideMother: String,
  imgUrl: List<Object>
}