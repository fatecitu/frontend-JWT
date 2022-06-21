const BASE_API = "https://klientagerencial.herokuapp.com/api"
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

export const getFaturamento = async () => {
  const token = localStorage.getItem('token')
  const req = await fetch(`${BASE_API}/nfEmitidas`, {
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

export const getFaturamentoServico = async () => {
  const token = localStorage.getItem('token')
  const req = await fetch(`${BASE_API}/nfServico`, {
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

export const getVendasServico = async () => {
  const token = localStorage.getItem('token')
  const req = await fetch(`${BASE_API}/osServico`, {
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

export const getVendas = async () => {
  const token = localStorage.getItem('token')
  const req = await fetch(`${BASE_API}/pedidosVendidos`, {
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

export const getDashboardVendas = async (inicio, fim, projeto) => {
  const token = localStorage.getItem('token')
  const req = await fetch(`${BASE_API}/pedidosVendidos/resumoVendas?inicio=${inicio}&fim=${fim}&projeto=${projeto}`, {
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

export const getDashboardFaturamento = async (inicio, fim, projeto) => {
  const token = localStorage.getItem('token')
  const req = await fetch(`${BASE_API}/nfEmitidas/resumoFaturamento?inicio=${inicio}&fim=${fim}&projeto=${projeto}`, {
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

export const getDashboardFaturamentoServico = async (inicio, fim, projeto) => {
  const token = localStorage.getItem('token')
  const req = await fetch(`${BASE_API}/nfServico/resumoFaturamento?inicio=${inicio}&fim=${fim}&projeto=${projeto}`, {
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

export const getDashboardVendasServico = async (inicio, fim, projeto) => {
  const token = localStorage.getItem('token')
  const req = await fetch(`${BASE_API}/osServico/resumoVendas?inicio=${inicio}&fim=${fim}&projeto=${projeto}`, {
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

export const logout = async () => {
  localStorage.removeItem('token')
  return null
}



export default logout
