import React, {Component, Fragment} from 'react';
import {
    getListData,
    listDataResults
} from '../actions'
import * as CITIES_DATA from '../constants/cities';
import {connect} from "react-redux";
import * as ROUTES from "../constants/routePaths";

class ListPage extends Component {
    selectedCity = "BÜTÜN İLLER";
    manipulatedDataArr = null;
    refInput = React.createRef();

    constructor(props){
        super(props);

        props.dispatch(getListData())
            .then((res) => {
                if (res.data.statusCode === 200) {
                    this.manipulatedDataArr = res.data.result.items;
                    props.dispatch(listDataResults(res.data.result.items));
                }
            });
    }

    componentDidMount() {
        document.addEventListener('keydown', this.onWindowKeyDown)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onWindowKeyDown)
    }

    onWindowKeyDown = (event) => {
        //todo : on enter
        if (event.which === 13) {
            this.getJobByName();
        }
    };

    onChangeCity = (e) => {
        this.selectedCity = e.target[e.target.selectedIndex].text;
        this.getJobBySelectedCity();
    };

    getJobBySelectedCity = () => {
        this.manipulatedDataArr = [];

        if (this.selectedCity == "BÜTÜN İLLER") {
            this.manipulatedDataArr = this.props.listData;
        }
        else {
            this.props.listData.filter(val => {
                console.log(val.cityName);
                if (val.cityName == this.selectedCity) {
                    this.manipulatedDataArr.push(val);
                }
            });
        }

        //todo : il seçimi yapıldıktan sonra eğer textbox doluysa ilgili olan ilanların getirilmesi için
        if(this.refInput.current.value.trim().length>0){
            this.getJobByName();
        }

        this.forceUpdate();
    };

    getJobByName = () => {
        if(this.refInput.current.value.trim().length>0){
            this.manipulatedDataArr = this.manipulatedDataArr.filter((x,i)=>{
                let data = x.positionName.toLocaleLowerCase();
                let inputVal = this.refInput.current.value.toLocaleLowerCase();

                let regData = new RegExp(inputVal);
                if (regData.test(data)) {
                    return x;
                }
            });

            this.forceUpdate();
        }
        else{
            // alert("Arama yapmak için bir değer giriniz.");
            // this.manipulatedDataArr = this.props.listData;
            this.manipulatedDataArr = [];
            //todo : textbox boş ve seçili herhangi bir il var ise seçili ildeki bütün ilanların getirilmesi için
            this.getJobBySelectedCity();
        }
    };

    gotoDetailPage = (jobId) => {
        this.props.history.push(ROUTES.JOB_DETAIL_WITHOUT_PARAM + jobId);
    };

    render() {
        return (
            <section className="job-list-root">
                <div className="input-container">

                    <div className="input-wrapper">
                        <div className="input-item">
                            <label>İlanları Filtrele</label>
                            <select onChange={this.onChangeCity}>
                                <option value="">BÜTÜN İLLER</option>
                                {Object.keys(CITIES_DATA.CITIES).map((city, i) => (
                                    <option key={i}
                                            value={city}
                                    >{CITIES_DATA.CITIES[city.toString()]}</option>
                                ))}
                            </select>
                        </div>

                        <div className="input-item">
                            <input type="text" placeholder="Anahtar kelime" ref={this.refInput}/>
                        </div>

                        <div className="button-item">
                            <button title="İstersen entera da basabilirsin" type="button" onClick={this.getJobByName}>ARAMA</button>
                        </div>
                    </div>
                </div>

                <div className="job-list-container">
                    {(this.manipulatedDataArr && this.manipulatedDataArr.length > 0) ?
                        <Fragment>
                            <div className="title-block">
                                <h1>İLGİLENEBİLECEĞİNİZ İLANLAR</h1>
                            </div>

                            <div className="job-list-wrapper">

                                {this.manipulatedDataArr.map((listItem, i) =>
                                    <div className="job-list-item" onClick={() => {
                                        this.gotoDetailPage(listItem.jobId)
                                    }} key={i}>
                                        <div className="image-block">
                                            <img src={listItem.imageUrl} alt={listItem.companyName}/>
                                        </div>

                                        <div className="info-block">
                                            <p>{listItem.positionName}</p>
                                            <p><span>{listItem.companyName}</span></p>
                                            <p>{listItem.cityName} / {listItem.townName}</p>
                                        </div>

                                        <aside className="duration-block">
                                            <span>{listItem.durationDayText}</span>
                                            <span> / </span>
                                            <span>{listItem.durationDay} gün</span>
                                        </aside>

                                        <aside className="distance-block">
                                            <p>{listItem.distance}</p>
                                        </aside>
                                    </div>
                                )}

                            </div>
                        </Fragment>
                        :
                        <div className="no-result-block">
                            <p>Aradığınız kriterde sonuç bulunamadı.</p>
                        </div>
                    }

                </div>

            </section>
    );
    }
}

const mapStateToProps = (state, ownProps, dispatch) => ({
    listData : state.listReducer.data ? state.listReducer.data: [],
});

export default connect(mapStateToProps)(ListPage);