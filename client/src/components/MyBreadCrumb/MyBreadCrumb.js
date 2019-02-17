import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import 'antd/dist/antd.css'
import styles from './MyBreadCrumb.css'

class MyBreadCrumb extends React.Component {
    render() {
        return <Breadcrumb
            className={styles["Breadcrumb"]}>
            {this.populateItems()}
        </Breadcrumb>
    }

    populateItems() {
        var items = [];
        if (typeof (this.props.items) != 'undefined') {
            for (var i = 0; i < this.props.items.length; i++) {

                if (i == this.props.items.length - 1) {
                    items.push(<Breadcrumb.Item><b>{this.props.items[i]}</b></Breadcrumb.Item>);
                }
                else {
                    items.push(<Breadcrumb.Item>{this.props.items[i]}</Breadcrumb.Item>);
                }
            }
        }
        return items;
    }
}

export default MyBreadCrumb