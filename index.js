function addScript(src, cb) {
	const script = document.createElement('script');
	script.src = src;
	script.type = 'text/javascript';
	script.async = true;
	document.head.appendChild(script);

	if (cb) {
		script.addEventListener('load', cb);
	}
}

function addStyle(src, cb) {
	const link = document.createElement('link');
	link.href = src;
	link.type = 'text/css';
	link.rel = 'stylesheet';
	document.head.appendChild(link);

	if (cb) {
		link.addEventListener('load', cb);
	}
}

let h = 'http://icanchoose.ru/widgets/project4/';
addStyle('//fonts.googleapis.com/css?family=Open+Sans:400,700&subset=latin,cyrillic');
addStyle('//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css');
addStyle(`build/app.css`);

if ('undefined' == typeof fetch) {
	addScript('https://cdn.polyfill.io/v2/polyfill.min.js?features=fetch');
}

if ('undefined' == typeof React) {
	const h = 'https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react';

	addScript(`${h}.js`, () => {
		if ('undefined' == typeof ReactDOM) {
			addScript(`${h}-dom.js`, init);
		}
	});
}

function init() {
	if (!window.icc) {
		return console.error('icc now found');
	}

	window.icc.map(el => {
		const opt = {
			id: el.id,
			companyId: 0 | el.companyId
		};

		if (!opt.id) {
			return console.error('Require element ID');
		}

		if (!opt.companyId) {
			return console.error('Require company ID');
		}

		const div = document.getElementById(opt.id);

		if (!div) {
			return console.error('Element by iD ' + opt.id + ' not found');
		}

		fetch(`http://icanchoose.ru/api/company/${opt.companyId}/`)
			.then(res => res.json())
			.then(res => {
				const wg = require('./widgets/widget').default;

				ReactDOM.render(
					React.createElement(wg, {
						company: res,
						width: div.offsetWidth
					}),
					div
				);
			})
			.catch(err => console.error(err));
	});
};
