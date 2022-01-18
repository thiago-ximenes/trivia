export default async function fetchQuestions(token) {
  const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
}
