import React from 'react';

const CardCovid = props => {
	return(
			<div className="col-sm-12 col-lg-3 mt-lg-1 mt-1">
				<div className="card shadow">
					<div className="card-body">
						<span>{props.title} <b>{props.value}</b></span>
					</div>
				</div>
			</div>
		)
}

export default CardCovid;