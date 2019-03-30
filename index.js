function addScript(src, cb) {
	const script = document.createElement('script');
	script.src = src;
	script.type = 'text/javascript';
	script.async = true;
	// script.crossorigin = true;
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

addStyle('//fonts.googleapis.com/css?family=Open+Sans:400,700&subset=latin,cyrillic');
addStyle('//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css');
addStyle(`http://icanchoose.ru/widgets/project4/app.css`);

if ('undefined' == typeof React) {
	addScript('https://unpkg.com/react@16/umd/react.production.min.js', () => {
		if ('undefined' == typeof ReactDOM) {
			addScript('https://unpkg.com/react-dom@16/umd/react-dom.production.min.js', init);
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

		fetch(`https://icanchoose.ru/api/company/${opt.companyId}/`)
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
}
