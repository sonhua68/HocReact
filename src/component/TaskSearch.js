import React, {Component} from 'react';

class TaskSearch extends Component {

    constructor(props){
        super(props);
        this.state = {
            keyword : ' '
        }
    }

    GetValue = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name] : value
        });
    }

    GetSearch = () =>{
        this.props.onSearch(this.state.keyword);
    }

    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                    <input name="keyword" type="text" className="form-control" placeholder="Nhập từ khoá..." onChange={this.GetValue}></input>
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="button" onClick={this.GetSearch}>
                            <span className="fa fa-search mr-5"></span> Tìm
                        </button>
                    </span>
                </div>
            </div>
            );
        }  
    }

export default TaskSearch;
