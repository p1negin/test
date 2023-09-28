const request = new XMLHttpRequest();
const url = 'https://api.cdnmovies.net/iframe';
request.open('GET', url);
request.setRequestHeader('Content-Type', 'application/x-www-form-url');
request.addEventListener("readystatechange", () => {
	if (request.readyState === 4 && request.status === 200) {
	  let iframes = document.getElementsByTagName('iframe');
	  for (let i = 0; i < iframes.length; i++) {
		let iframe = iframes[i];
		if(iframe.src.includes('cdnmovies')) {
			let newDomain = request.responseText;
			let currentUrl = iframe.src;
			let urlParts = currentUrl.split('://');
			if (urlParts.length === 2) {
				let protocol = urlParts[0];
				let restOfUrl = urlParts[1];
				let pathParts = restOfUrl.split('/');
				pathParts[0] = newDomain;
				let newUrl = protocol + '://' + pathParts.join('/');
				setTimeout(() => {
					iframe.src = newUrl;
				}, 100); 
			} 
		}
	  }
	}
});
request.send();
