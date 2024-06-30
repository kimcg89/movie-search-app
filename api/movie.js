// serverless 함수 로직

// node.js 환경에서는 fetch 함수가 없음
// node-fetch 라는 걸 설치 해야함
import fetch from "node-fetch"

// const { APIKEY } = process.env

export default async function handler( request, response) {
  const { title, page, id} = JSON.parse(request.body)
  const url = id 
  ? `https://omdbapi.com?apikey=7035c60c&i=${id}&plot=full` 
  : `https://omdbapi.com?apikey=7035c60c&s=${title}&page=${page}`
  // const url = id 
  // ? `https://omdbapi.com?apikey=${APIKEY}&i=${id}&plot=full` 
  // : `https://omdbapi.com?apikey=${APIKEY}&s=${title}&page=${page}`
  const res = await fetch(url)
  const json = await res.json()
  response
  .status(200)
  .json(json)
}