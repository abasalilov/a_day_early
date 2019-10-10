import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const styles = {
    'roll-3': {
        margin: '2rem 0rem 0rem 6rem',
        textAlign: 'left',
    },
    'p-2': {
        textAlign: 'left',
    },
    'container-1': {
        margin: '0rem auto',
    },
    link: {
        color: 'white',
    },
};

const RegLeftPanelComponent = (props) => {
    /* eslint-disable */
    const { classes } = props;
    return (
        <div className="w3-col m12 l4 window-dark w3-content">
            <h5>
                G-MAS leadership drives all dimensions at each stage of the token sale and dApp
                development:
            </h5>

            <ul>
                <li>
                    <Link className={classes.link} to="/services#wp">
                        White paper drafting.
                    </Link>
                </li>
                <li>
                    <Link className={classes.link} to="/services#video">
                        Video content creation.
                    </Link>
                </li>
                <li>
                    <Link className={classes.link} to="/services#reg">
                        Regulatory Compliance.
                    </Link>
                </li>
                <li>
                    <Link className={classes.link} to="/services#pr">
                        PR and marketing.
                    </Link>
                </li>

                <li>
                    <Link className={classes.link} to="/services#token">
                        Token sale website creation.
                    </Link>
                </li>

                <li>
                    <Link className={classes.link} to="/services#token">
                        Token and secure wallet development.
                    </Link>
                </li>

                <li>
                    <Link className={classes.link} to="/services#dapp">
                        dApp Software Architecture.
                    </Link>
                </li>

                <li>
                    <Link className={classes.link} to="/services#tech">
                        Technical implementation.
                    </Link>
                </li>

                <li>
                    <Link className={classes.link} to="/services#tech">
                        Technical Sourcing and Recruiting.
                    </Link>
                </li>
            </ul>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        mobile: state.mobile,
    };
};

const RegLeftPanelWithStyles = withStyles(styles)(RegLeftPanelComponent);

const ConnectedLeftPanel = connect(mapStateToProps)(RegLeftPanelWithStyles);

export const RegLeftPanel = ConnectedLeftPanel;
