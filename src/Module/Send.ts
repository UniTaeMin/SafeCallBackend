function Send(res, status: number, data?: any) {
  res
    .status(status)
    .send({ data })
    .end()
}
export default Send
