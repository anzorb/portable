import React, { Component } from 'react';
import { Router, Route, IndexRedirect, IndexRoute, Link, hashHistory } from 'react-router';
import './Breadcrumbs.scss';
import Chip from 'material-ui/Chip';

const Breadcrumbs = ({ url }) => {
    const tokens = url.split('/');
    tokens.splice(0, 1);
    console.log(tokens);
    const renderBreadcrumbs = () => {
        let fullRoute = '';
        let idx = 0;
        return tokens.map((token, id) => {
            fullRoute += encodeURIComponent(`/${token}`);
            fullRoute.slice(0, -1);
            idx++;
            let styles = {};
            if (idx === tokens.length) {
                styles = {
                    'background-color': '#c5dde8',
                    'color': 'white'
                };
            } else {
                styles = {};
            }
            console.log(Chip);
            return (
                <Link key={id} to={`goto/${fullRoute}`}>
                    <Chip className="breadcrumbs__chip">{ token }</Chip>
                </Link>
                )
        });
    }

    return <div className="breadcrumbs">{ renderBreadcrumbs() }</div>
};

export default Breadcrumbs;