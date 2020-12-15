const query = `{ olaMundo }`
const options = {
	method:'post',
	headers:{
		'Content-Type':'application/json',
	},
	body: JSON.stringify({query})
}
const createOlaMundo = string => {
	const body = document.querySelector('body')
	body.innerHTML = (string) ;
}

fetch(`http://0.0.0.0:4000/graphql`,options)
	.then(resp => resp.json())
	.then(dados => createOlaMundo(dados.data.olaMundo))


