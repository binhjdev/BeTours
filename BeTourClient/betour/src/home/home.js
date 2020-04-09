import React, { Component } from 'react';
import icons from "../icons.svg";
import { listTour } from '../user/apiUser';

class home extends Component {
	constructor() {
		super()
		this.state = {
			tours: []
		}
	}

	componentDidMount() {
		listTour().then(data => {
			if (!data.status === 'Success') {
				console.log(data.error);
			} else {
				this.setState({ tours: data.data.tours });
			}
		});
	}


	render() {
		const { tours } = this.state;
		return (
			<main className="main">
				<div className="card-container">
					{tours && tours.map((tour, index) => {
						return (
							<div className="card" key={index}>
								<div className="card_header">
									<div className="card_picture">
										<div className="card_picture-overlay"></div>
										<img className="card_picture-img" src={tour.imageCover} alt=""></img>
									</div>
									<h3 className="heading-tertirary">
										<span>{tour.name}</span>
									</h3>
								</div>

								<div className="card_details">
									<h4 class="card_sub-heading">{tour.timeVisit}</h4>
									<p class="card_text">{tour.summary}</p>
									<div className="card_data">
										<svg className="card_icon">
											<use xlinkHref={`${icons}#${'icon-map-pin'}`} />
										</svg>
										<span>{tour.location}</span>
									</div>
									<div className="card_data">
										<svg className="card_icon">
											<use xlinkHref={`${icons}#${'icon-calendar'}`} />
										</svg>
										<span>{tour.startDate}</span>
									</div>
									<div className="card_data">
										<svg className="card_icon">
											<use xlinkHref={`${icons}#${'icon-flag'}`} />
										</svg>
										<span>{tour.stationStop} trạm dừng</span>
									</div>
									<div className="card_data">
										<svg className="card_icon">
											<use xlinkHref={`${icons}#${'icon-user'}`} />
										</svg>
										<span>{tour.maxGroupSize} người</span>
									</div>
								</div>

								<div className="card_footer">
									<p>
										<span class="card_footer-value">{tour.price} </span>
										<span class="card_footer-text"> trên 1 người</span>
									</p>

									<p className="card_ratings">
										<span class="card_footer-value">{tour.ratingsAverage} </span>
										<span class="card_footer-text">rating ({tour.ratingsQuantity})</span>
									</p>
									<a className="btn btn--green btn-small" href="">Chi tiết</a>
								</div>
							</div>
						);
					})}
				</div>
			</main>
		);
	}
}

export default home;