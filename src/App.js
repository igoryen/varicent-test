import axios from 'axios';
import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCodeFork, faStar, faPlus, faBell, faCircle, faBookOpen, faCube, faChartColumn, faBookBookmark, faBars } from '@fortawesome/free-solid-svg-icons';
import './App.css';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mainSet: [],
            items: [],
            isLoaded: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);

        this.gh_username_ref = React.createRef();
    };




    handleKeypress = e => {
        //it triggers by pressing the enter key
        if (e.key === "Enter") {
            console.log("pressed", e.keyCode)
            this.handleSubmit();
        } else {
            console.log("pressed", e.keyCode)
        }
    };


    handleSubmit = (e) => {
        console.log("in handleSubmit()")



        let username = this.gh_username_ref.current.value;
        this.gh_username_ref.current.value = "";

        axios.get(`https://api.github.com/users/${username}`)
            .then(response => this.setState({
                mainSet: response.data,
                isLoaded: true
            }))

        const max_items = {
            params: {
                page: 1,
                per_page: 20
            }
        };

        axios.get(`https://api.github.com/users/${username}/repos`, max_items)
            .then(response => this.setState({
                items: response.data
            }));

    };

    isCurrentYear = (year) => {
        const today = new Date();
        const currentYear = today.getFullYear();
        return year === currentYear ? true : false;
    }

    render() {




        return (
            <div className="App">
                <div className='main-wrapper'>
                    <section className='section__top'>
                        <div className='section__top-half mobile'>
                            <div className='section__top-half--element'>
                                <FontAwesomeIcon icon={faBars} />
                            </div>
                        </div>
                        <div className='section__top-half'>
                            <div className='section__top-half--element'>
                                <FontAwesomeIcon icon={faGithub} />
                            </div>
                            <div className='section__top-half--element link search-element'>
                                <input ref={this.gh_username_ref} onKeyPress={this.handleKeypress} type="text" placeholder='Enter Github Username...' autoFocus></input>
                                <button onClick={this.handleSubmit}>/</button>
                            </div>
                            <div className='section__top-half--element link'>Pull Requests</div>
                            <div className='section__top-half--element link'>Issues</div>
                            <div className='section__top-half--element link'>Codespaces</div>
                            <div className='section__top-half--element link'>Marketplace</div>
                            <div className='section__top-half--element link'>Explore</div>
                        </div>
                        <div className='section__top-half'>
                            <div className='section__top-half--element'>
                                <span className='notifications'>
                                    <span className='bell'>
                                        <FontAwesomeIcon icon={faBell} /></span>
                                    <span className='circle'>
                                        <FontAwesomeIcon icon={faCircle} />
                                    </span>
                                </span>
                            </div>
                            <div className='section__top-half--element desktop'>
                                <span className='add'>
                                    <FontAwesomeIcon icon={faPlus} />
                                </span>
                                <span className='triangle'></span>
                            </div>

                            {this.state.isLoaded &&
                                <div className='section__top-half--element desktop'>
                                    <img src={this.state.mainSet.avatar_url} alt="User's Avatar" />
                                    <span className='triangle'></span>
                                </div>
                            }
                        </div>

                    </section>



                    {this.state.isLoaded &&
                        <div >
                            <section className='section__middle'>
                                <div className='section__middle--elements'>
                                    <div className='section__middle--element'>
                                        <span className='icon'><FontAwesomeIcon icon={faBookOpen} /></span>
                                        <span className='name'>Overview</span>
                                    </div>
                                    <div className='section__middle--element active'>
                                        <span className='icon'><FontAwesomeIcon icon={faBookBookmark} /></span>
                                        <span className='name'>Repositories</span>
                                        <span className='amount'>165</span>
                                    </div>
                                    <div className='section__middle--element'>
                                        <span className='icon'><FontAwesomeIcon icon={faChartColumn} /></span>
                                        <span className='name'>Projects</span>
                                    </div>
                                    <div className='section__middle--element'>
                                        <span className='icon'><FontAwesomeIcon icon={faCube} /></span>
                                        <span className='name'>Packages</span>
                                    </div>
                                </div>

                            </section>

                            <section className='section__bottom'>
                                <div key={this.state.mainSet.id} className='block user'>
                                    <div className='avatar'>
                                        <img src={this.state.mainSet.avatar_url} alt="User's Avatar" />
                                    </div>
                                    <div className='user__description'>

                                        <div className='user__name'>{this.state.mainSet.name}</div>
                                        <div className='user__login'>{this.state.mainSet.login}</div>
                                        <p className='user__bio'>{this.state.mainSet.bio}</p>

                                    </div>
                                </div>

                                <div className='block '>

                                    <div className='chunk top-chunk'>
                                        <input placeholder="Find a repository..."></input>
                                    </div>

                                    {this.state.items.map(item => (
                                        <div key={item.id} className="chunk">
                                            <p className='item__part--top'>
                                                <a href='{item.url}' target="_blank" className='item name'>{item.name}</a>
                                                <button className='item__part--top-element'>
                                                    <span className='symbol star'>
                                                        <FontAwesomeIcon icon={faStar} />
                                                    </span>
                                                    <span className='button__label'>Star</span>
                                                </button>
                                            </p>
                                            <p className='item__part--middle'>
                                                {item.description}
                                            </p>
                                            <p className='item__part--bottom'>
                                                {item.language &&
                                                    <span className='item__part--bottom-element'>
                                                        <span className='symbol'>
                                                            <span className={`lang ${item.language}`}></span>
                                                        </span>{item.language}</span>
                                                }
                                                <span className='item__part--bottom-element'>
                                                    <span className='symbol star'>
                                                        <FontAwesomeIcon icon={faStar} />
                                                    </span>{item.stargazers_count}</span>
                                                <span className='item__part--bottom-element'>
                                                    <span className='symbol forks'>
                                                        <FontAwesomeIcon icon={faCodeFork} />
                                                    </span>{item.forks_count}</span>
                                                <span className='item__part--bottom-element'>Updated on&nbsp;{
                                                    this.isCurrentYear(new Date(item.updated_at).getFullYear())
                                                        ? <Moment format="D MMM">{item.updated_at}</Moment>
                                                        : <Moment format="D MMM YYYY">{item.updated_at}</Moment>
                                                }

                                                </span>
                                            </p>
                                        </div>
                                    ))}

                                </div>
                            </section>
                        </div>
                    }
                    {!this.state.isLoaded &&
                        <section className='not-found'>
                            <h1>Please enter a Github username<br></br>to see results...</h1>
                        </section>
                    }


                </div>



            </div>
        );
    }
}

export default App;