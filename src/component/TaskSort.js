import React, {Component} from 'react';

class TaskSort extends Component {

    SortField = (fByName, fSort) => {
        this.props.onSort(fByName, fSort);
    }

    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split"  id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Sắp Xếp <span className="fa fa-caret-down ml-5"></span>
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenu">
                        <li onClick={ () => this.SortField('name', 1)}>
                            <a role="button">
                                <span className="fa fa-sort-alpha-asc mr-5">Tên A-Z</span>
                                <i className={(this.props.sortBy === 'name' && this.props.sortVal === 1) ? 'fa fa-check text-right' : ''}></i>
                            </a>
                        </li>
                        <li onClick={ () => this.SortField('name', -1)}>
                            <a role="button">
                                <span className="fa fa-sort-alpha-desc mr-5">Tên Z-A</span>
                                <i className={(this.props.sortBy === 'name' && this.props.sortVal === -1) ? 'fa fa-check text-right' : ''}></i>
                            </a>
                        </li>
                        <li role="separator" className="divider"></li>
                        <li onClick={ () => this.SortField('status', 1)}>
                            <a role="button">
                                Trạng Thái Kích Hoạt
                                <i className={(this.props.sortBy === 'status' && this.props.sortVal === 1) ? 'fa fa-check text-right' : ''}></i>
                            </a>
                        </li>
                        <li onClick={ () => this.SortField('status', -1)}>
                            <a role="button">
                                Trạng Thái Ẩn
                                <i className={(this.props.sortBy === 'status' && this.props.sortVal === -1) ? 'fas fa-check text-right' : ''}></i>
                            </a>
                        </li>
                    </div>
                </div>
            </div>
            );
        }  
    }

export default TaskSort;
