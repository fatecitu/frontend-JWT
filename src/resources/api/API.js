const BASE_API = "https://doalize-backend.herokuapp.com/api"
//const BASE_API = "http://localhost:4000/api"

export const checkToken = async (token) => {
  const req = await fetch(`${BASE_API}/usuarios/token`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': token
    }
  })
  const json = await req.json()
  return json
}

export const signIn = async (email, senha) => {
  const req = await fetch(`${BASE_API}/usuarios/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, senha })
  })
  const json = await req.json()
  return json
}

