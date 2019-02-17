import { NavLink } from "react-router-dom";
import React, { Component } from 'react';
import $ from 'jquery'
import styles from './MySideNav.css'
import fa_styles from '../../lib/font-awesome/css/font-awesome.min.css';
import '../../lib/styleUnmangled/Router.css'

class MySideNav extends Component {
    state = {
    }

    componentDidMount() {
        var activeSubItem = $("." + styles.MySideNav_SubItem + ".active");
        if (typeof (activeSubItem) !== 'undefined') {
            var subItemsContainer = activeSubItem.parent();
            subItemsContainer.show(100);

            var subMenuTitleCaretDown = subItemsContainer.parent().find("." + styles.MySideNav_CaretDown);
            subMenuTitleCaretDown.toggleClass(styles["down"]);
        }

        $("." + styles.MySideNav_Brand + ", ." + styles.MySideNav_SubItem + ", ." + styles.MySideNav_Item + ", ." + styles.MySideNav_Scrim).click(function () {
            this.hide();
        }.bind(this));
    }

    onSubMenuClick(e) {
        var subMenuItemsContainer = $(e.currentTarget).find("." + styles.MySideNav_SubItems_Container);
        var subMenuTitleCaretDown = $(e.currentTarget).find("." + styles.MySideNav_CaretDown);
        if ($(e.target).hasClass(styles.MySideNav_SubTitle) || $(e.target).hasClass(styles.MySideNav_CaretDown)) {
            if (subMenuItemsContainer.css("display") === "none")
                // subMenuItemsContainer.css("display", "block");
                subMenuItemsContainer.show(100);
            else
                // subMenuItemsContainer.css("display", "none");
                subMenuItemsContainer.hide(100)

            subMenuTitleCaretDown.toggleClass(styles["down"]);
        }
    }

    display() {
        $("." + styles.MySideNav_Wrapper).removeClass(styles.Hidden);
        $("." + styles.MySideNav_Scrim).removeClass(styles.Hidden);
    }

    hide() {
        $("." + styles.MySideNav_Wrapper).addClass(styles.Hidden);
        $("." + styles.MySideNav_Scrim).addClass(styles.Hidden);
        this.props.onScrimClick();
    }

    getItems() {
        var elems = []
        var header = "";
        var footer = "";
        var container_elems = []

        if (typeof (this.props.menu.header) !== "undefined") {
            if (this.props.menu.header.link !== "") {
                elems.push(
                    <div className={styles.MySideNav_Header}>
                        <NavLink exact to={this.props.menu.header.link} className={styles.MySideNav_Brand}>{this.props.menu.header.value}</NavLink>
                    </div>
                );
            }
            else {
                elems.push(
                    <div className={styles.MySideNav_Header}>
                        <div className={styles.MySideNav_Brand}>{this.props.menu.header.value}</div>
                    </div>
                );
            }
        }

        this.props.menu.container.forEach(element => {
            if (element.type === "item") {
                if (element.link !== "") {
                    container_elems.push(
                        <NavLink exact to={element.link} className={styles.MySideNav_Item}>{element.value}</NavLink>
                    );
                } else {
                    container_elems.push(
                        <div className={styles.MySideNav_Item}>{element.value}</div>
                    );
                }
            }
            if (element.type === "submenu") {
                var subMenuTitle = {};
                if (element.link !== "") {
                    subMenuTitle = <NavLink exact to={element.link} className={"nav-text " + styles.MySideNav_SubTitle}>{element.value}</NavLink>
                } else {
                    subMenuTitle = <div to={element.link} className={"nav-text " + styles.MySideNav_SubTitle} >{element.value}
                        <i className={fa_styles["fa"] + " " + fa_styles["fa-caret-down"] + " " + styles.MySideNav_CaretDown + " " + styles["rotate"]} />
                    </div>
                }

                var subelems = [];
                element.items.forEach(subitem => {
                    if (subitem.link !== "") {
                        subelems.push(
                            <NavLink exact to={subitem.link} className={styles.MySideNav_SubItem}>{subitem.value}</NavLink>
                        );
                    } else {
                        subelems.push(
                            <div className={styles.MySideNav_SubItem}>{subitem.value}</div>
                        );
                    }
                });
                container_elems.push(<div className={styles.MySideNav_SubMenu} onClick={((e) => this.onSubMenuClick(e))}>
                    {subMenuTitle}
                    <div className={styles.MySideNav_SubItems_Container}>
                        {subelems}
                    </div>
                </div>);
            }
        });

        elems.push(
            <div className={styles.MySideNav_Container}>
                {container_elems}
            </div>);

        if (typeof (this.props.menu.footer) !== "undefined") {
            if (this.props.menu.footer.link !== "") {
                elems.push(
                    <NavLink exact to={this.props.menu.footer.link} className={styles.MySideNav_Footer}>{this.props.menu.footer.value}</NavLink>
                );
            } else {
                elems.push(
                    <div className={styles.MySideNav_Footer}>{this.props.menu.footer.value}</div>
                );
            }
        }

        return elems;
    }

    render() {
        // var urlParts = window.location.href.split("/");
        var items = this.getItems()

        return <div className={styles.MySideNav_Wrapper + " " + styles.Hidden}>
            <div className={styles.MySideNav_Scrim + " " + styles.Hidden} />
            {items}
        </div>
    }
}

MySideNav.defaultProps = {
    menu: {
        header: {
            "type": "item",
            "value": "Vilokan Labs",
            "link": "/"
        },
        container: [
            {
                "type": "item",
                "value": "Project",
                "link": "/project"
            },
            {
                "type": "submenu",
                "value": "Issues",
                "link": "",
                "items": [
                    {
                        "type": "subitem",
                        "value": "List",
                        "link": "/issues"
                    },
                    {
                        "type": "subitem",
                        "value": "Boards",
                        "link": "/boards"
                    },
                    {
                        "type": "subitem",
                        "value": "Labels",
                        "link": "/labels"
                    },
                    {
                        "type": "subitem",
                        "value": "Service Desk",
                        "link": "/service_desk"
                    }
                ]
            },
            {
                "type": "item",
                "value": "Members",
                "link": "/members"
            },
        ],
        footer: {
            "type": "item",
            "value": "<< Collapse Sidebar",
            "link": ""
        },
    }
};

export default MySideNav