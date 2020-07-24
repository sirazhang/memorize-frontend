import React, {Component} from 'react';

class Pagination extends Component {
    constructor() {
        super();
        this.state={
            cur: 1,
            total: null,
        }
    }

    onClickPage(cur) {
        //console.log(this.props)
        this.props.onPage(cur, this.props.pageSize, this.props.searchValue)
        this.props.onPageChange(cur)
        this.setState({cur:cur})
    }
    render() {
        let {total} = this.props
        let {cur} = this.state
        return (
            <div className="pagination-container">
                <button onClick={()=>{
                    if(cur===1)
                        return
                    this.props.onPage(cur-1, this.props.pageSize, this.props.searchValue)
                    this.props.onPageChange(cur)
                    this.setState({cur: cur-1})
                }}>Prev</button>
                <button onClick={() => this.onClickPage(1)}>1</button>
                {cur <=2 ? null : <span>...</span>}
                {((cur === 1) || (cur === total)) ? null : <button onClick={() => this.onClickPage(cur)}>{cur}</button>}
                {cur >=total ? null : <span>...</span>}
                <button onClick={() => this.onClickPage(total)}>{total}</button>
                <button onClick={()=>{
                    if(cur===total)
                        return
                    cur++;
                    this.props.onPage(cur, this.props.pageSize, this.props.searchValue)
                    this.props.onPageChange(cur)
                    this.setState({cur})
                }}>Next</button>
            </div>
        );
    }
}
export default Pagination

