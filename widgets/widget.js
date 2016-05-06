export default class Widget extends React.Component {

	static propTypes = {
		company: React.PropTypes.object.isRequired
	};

	static defaultProps = {
		host: 'http://icanchoose.ru'
	};

	render() {
		const { company: {
			title,
			site,
			slug,
			logo,
			jobs,
			activity,
			location,
			resources: {
				fixed,
				other
			}
		}, host } = this.props,
			Carousel = require('./carousel').default,
			social = require('./social').default,
			quote = require('./quote').default,
			Office = require('./office').default,
			widgets = {
				video: require('./video').default,
				figure: require('./figure').default,
				insight: require('./insight').default,
				instagram: require('./instagram').default,
				twitter: social,
				facebook: social,
				quote_orange: quote,
				quote_red: quote,
				quote_turquoise: quote,
				quote_purple: quote
			},
			sm = 1000 > this.props.width;

		return (
			<div className="company" style={{minWidth: '750px'}}>
				<div className="content">
					<div className="company-heading">
						<div className="company-heading-logo">
							<a target="_blank" href={site}>
								<img alt={title} src={host + logo} />
							</a>
						</div>
						<div className="company-heading-title">
							<h1>
								<small>Наша компания</small>
								<br />
								{title}
							</h1>
						</div>
						<div className="company-heading-metadata">
							<span><i className="sprite sprite-filter-world" /> { activity }</span>
							<span><i className="sprite sprite-filter-users" /> 50 – 300 человек</span>
							<span><i className="sprite sprite-filter-marker" /> { location }</span>
						</div>
					</div>
					<div className="company-body">
						<div className="row">
							<div className={`col-md-${sm ? 12 : 8}`}>
								<Carousel>
									{fixed[0].data.slider.map((el, index) =>
										<img src={host + el.path} key={index} />
									)}
								</Carousel>
							</div>
							<div className={`col-md-${sm ? 12 : 4}`}>
								<div className="row">
									<div className={`col-md-${sm ? 6 : 12}`}>
										<Office host={host} slug={slug} {...fixed[1]} />
									</div>
									<div className={`col-md-${sm ? 6 : 12}`}>
										<Office host={host} slug={slug} {...fixed[2]} />
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className={`col-md-${sm ? 6 : 4} widgets-col1`}>
								{Object.keys(other).filter(el => 0 == el % 3).map(el => {
									const Widget = widgets[other[el].type];
									return <Widget host={host} slug={slug} { ...other[el]} key={el} />;
								})}
								{sm ? Object.keys(other).filter(el => 2 == el % 3).map((el, index) => {
									if (1 == index % 2) return;
									const Widget = widgets[other[el].type];
									return <Widget host={host} slug={slug} { ...other[el]} key={el} />;
								}) : ''}
							</div>
							<div className={`col-md-${sm ? 6 : 4} widgets-col1`}>
								{Object.keys(other).filter(el => 1 == el % 3).map(el => {
									const Widget = widgets[other[el].type];
									return <Widget host={host} slug={slug} { ...other[el]} key={el} />;
								})}
								{sm ? Object.keys(other).filter(el => 2 == el % 3).map((el, index) => {
									if (0 == index % 2) return;
									const Widget = widgets[other[el].type];
									return <Widget host={host} slug={slug} { ...other[el]} key={el} />;
								}) : ''}
							</div>
							{sm
								? ''
								: <div className="col-md-4 widgets-col1">
										{Object.keys(other).filter(el => 2 == el % 3).map(el => {
											const Widget = widgets[other[el].type];
											return <Widget host={host} slug={slug} { ...other[el]} key={el} />;
										})}
									</div>
							}
						</div>
					</div>
					{jobs
						? <div className="row">
								<div className={`col-md-${sm ? 12 : 8}`}>
									<a className="widget widget--help-job" target="_blank" href={`http://icanchoose.ru/company/${slug}/job/`}>
										<div className="media">
											<img height={70} width={70} className="pull-left" alt="Помогите найти!" src="./files/user_what.png" />
											<div className="media-body">
												<h3 className="media-heading">Помогите найти!</h3>
												Разыскиваем специалиста в нашу компанию!<br />Узнайте кто нам нужен!
											</div>
										</div>
									</a>
								</div>
							</div>
						: ''}
				</div>
			</div>
		);
	}

};
