import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    getDetailData,
    detailDataResult,
    resetDetailData,
} from '../actions'
import {Link} from "react-router-dom";
import * as ROUTES from '../constants/routePaths';

class DetailPage extends Component {
    urlArr = null;
    jobId = null;

    constructor(props){
        super(props);

        this.urlArr = props.match.url.split('/');
        this.jobId = this.urlArr[this.urlArr.length - 1];
        props.dispatch(getDetailData(this.jobId))
            .then((res)=>{
                if(res.data.statusCode === 200){
                    props.dispatch(detailDataResult(res.data.result));
                }
            })
    }

    componentWillUnmount() {
        this.props.dispatch(resetDetailData());
    }

    render() {
        return (
            <section className="job-detail-root">

                <div className="job-detail-container">
                    {this.props.detailData &&
                    <div className="job-detail-block">

                        <div className="job-top-detail-item">
                            <div className="image-block">
                                <img src={this.props.detailData.imageUrl} alt={this.props.detailData.companyName}/>
                            </div>

                            <div className="main-info-block">
                                <p>{this.props.detailData.positionName}</p>
                                <p>{this.props.detailData.companyName}</p>
                                <p>{this.props.detailData.cityName} / {this.props.detailData.townName}</p>
                            </div>
                        </div>

                        <div className="job-bottom-detail-item">
                            <div className="desc-block">
                                <p>Detay : {this.props.detailData.description}</p>
                            </div>

                            <div className="adress-block">
                                <p>Adres : {this.props.detailData.address}</p>
                            </div>

                            {this.props.detailData.contactPhone &&
                            <div className="phone-block">
                                <p>Telefon : {this.props.detailData.contactPhone.countryCallingCode} {this.props.detailData.contactPhone.areaCode} {this.props.detailData.contactPhone.number}</p>
                            </div>
                            }
                        </div>

                        <aside className="duration-block">
                            <span>{this.props.detailData.durationDayText}</span>
                            <span> / </span>
                            <span>{this.props.detailData.durationDay} gün</span>
                        </aside>

                        <aside className="distance-block">
                            <p>{this.props.detailData.cityName} / {this.props.detailData.townName}</p>
                        </aside>

                    </div>
                    }
                </div>

                <div className="input-wrapper">
                    <div className="button-item">
                        <button type="button">
                            <Link to={ROUTES.JOB_LIST}>
                                Liste sayfasına geri dön
                            </Link>
                            </button>
                    </div>
                </div>

            </section>

        );
    }
}


const mapStateToProps = (state, ownProps, dispatch) => ({
    detailData : state.detailReducer.data ? state.detailReducer.data: null,
});

export default connect(mapStateToProps)(DetailPage);
