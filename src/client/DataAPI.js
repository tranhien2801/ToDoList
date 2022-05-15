import axios from "axios";


export const login = async () => {
    fetch('http://192.168.16.102:3000', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: 'tvphuong10@gmail.com',
				password: '123456',
			})
		})
}

// export const getFromAPI = (url) => {
//     fetch(url)
//     .then((response) => response.json()
// 	)
//     .then((ret) => ret.result
//     )
// 	.catch(err => console.error(err));
// }


export  const getFromAPI = async(url) => {
	try {
		const res = await fetch(url);
		const data  = await res.json().result;
	} catch(err) {
		console.log(err);
	}
}

  