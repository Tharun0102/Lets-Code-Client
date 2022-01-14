import axios from "axios";

export const run = async (languageType, code, input) => {
  // req1 for token
  const headers = {
    'Content-Type': 'application/json',
    'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY || 'dcfb27d6e3mshc93558a5696e4b7p1c1140jsnf90fc22aaec5',
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
  }
  const data = {
    "source_code": code,
    "language_id": languageCode[languageType],
    "stdin": input
  }
  const res1 = await axios.post('https://judge0-ce.p.rapidapi.com/submissions',
    data,
    { headers: headers }
  ).catch(function (error) {
    console.error(error);
  });
  const token = res1?.data?.token;

  // req2 for output
  const res2 = await axios.get(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, { headers: headers })
    .catch(error => {
      console.error(error);
    });
  return res2?.data;
}

const languageCode = {
  "Python": 70,
  "Java": 62,
  "JavaScript": 63,
  "C": 50,
  "C++": 76
}

