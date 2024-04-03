

export interface signupRequest {
  groomName: string,
  brideName: string,
  groomContact: string,
  brideContact: string,
  weddingDate: string,
  weddingDay: string,
  weddingTime: string,
  location: string,
  email: string,
  greeting: string,
  groomFather?: string,
  groomMother?: string,
  brideFather?: string,
  brideMother?: string,
  imgUrl: List<object>,
  isMem: boolean,
}