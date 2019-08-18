import React, {Component} from 'react';

class TaskForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            id : ' ',
            name : ' ',
            status : false
        }
    }

    UNSAFE_componentWillMount(){
        if (this.props.task !== null){
            this.setState({
                id : this.props.task.id,
                name : this.props.task.name,
                status : this.props.task.status
            });
        }
    }

    UNSAFE_componentWillReceiveProps = (nextProps) =>{
        if (nextProps.task !== null){
            this.setState({
                id : nextProps.task.id,
                name : nextProps.task.name,
                status : nextProps.task.status
            });
        }else{
            this.setState({
                id : ' ',
                name : ' ',
                status : false
            });
        }
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    onHandleChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (name === 'status'){
            value = target.value === 'true' ? true : false
        }
        this.setState({
            [name] : value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state)
        this.clearState();
        this.onCloseForm();
    }

    clearState = () => {
        this.setState({
            id : ' ',
            name : '',
            status : false
        });
    }

    render() {
        var title = this.state.id.trim() !== '' ? 'Cập Nhật Công Việc' : 'Thêm Công Việc';
        return (
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <div className="panel panel-warning">
                    <div className="panel-heading">
                        <div className="panel-title">
                            {title}
                            <span className="text-right">
                                <span className="fa fa-times-circle" onClick={this.onCloseForm}></span>
                            </span>
                        </div>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Tên :</label>
                                <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onHandleChange}></input>
                            </div>
                            <label>Trạng Thái :</label>
                            <select className="form-control" name="status" value={this.state.status} onChange={this.onHandleChange}>
                                <option value={true}>Kích Hoạt</option>
                                <option value={false}>Ẩn</option>
                            </select><br/>
                            <div className="text-center">
                                <button type="submit" className="btn btn-warning">
                                    <span className="fa fa-plus-circle mr-5"></span> Lưu Lại
                                </button>&nbsp;
                                <button type="button" className="btn btn-danger" onClick={this.clearState}>
                                    <span className="fa fa-times-circle mr-5"></span> Huỷ Bỏ
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            );
        }  
    }

export default TaskForm;
