// import React from 'react';
// import { connect } from 'react-redux';
// /* eslint-disable */
// import ScatterJS from 'scatter-js/dist/scatter.cjs'; // CommonJS style
// import Eos from 'eosjs';
// import { withStyles } from '@material-ui/core/styles';
// import EventListener, { withOptions } from 'react-event-listener';
// import { HeaderLink } from '../../common';
// import { isHeaderMobile, isServer } from '../../../../helpers';
// import {
//     resetAuth as createResetAuthAction,
//     resizeEvent as createResizeEventAction,
// } from '../../../actions';

// const network = {
//     blockchain: 'eos',
//     protocol: 'https',
//     host: 'nodes.get-scatter.com',
//     port: 443,
//     chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
// };

// const styles = {
//     reg: {
//         marginRight: '2rem',
//     },
//     link: {
//         fontSize: '3rem',
//     },
//     header: {
//         paddingBottom: '5rem',
//     },
//     unadorned: {},
// };

// const otherHeaderLinks = ['Home', 'About Us', 'Services', 'Contact Us'];

// class EOSHeaderComponent extends React.Component {
//     constructor(props) {
//         super(props);

//         this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
//     }

//     async componentDidMount() {
//         this.handleWindowSizeChange();
//         if (!isServer) {
//             ScatterJS.scatter.connect('G-MAS').then((connected) => {
//                 // If the user does not have Scatter or it is Locked or Closed this will return false;
//                 if (!connected) return false;

//                 const scatter = ScatterJS.scatter;

//                 // Now we need to get an identity from the user.
//                 // We're also going to require an account that is connected to the network we're using.
//                 const requiredFields = { accounts: [network] };
//                 scatter
//                     .getIdentity(requiredFields)
//                     .then(() => {
//                         // Always use the accounts you got back from Scatter. Never hardcode them even if you are prompting
//                         // the user for their account name beforehand. They could still give you a different account.
//                         const account = scatter.identity.accounts.find(
//                             (x) => x.blockchain === 'eos'
//                         );

//                         // You can pass in any additional options you want into the eosjs reference.
//                         const eosOptions = { expireInSeconds: 60 };

//                         // Get a proxy reference to eosjs which you can use to sign transactions with a user's Scatter.
//                         const eos = scatter.eos(network, Eos, eosOptions);

//                         // ----------------------------
//                         // Now that we have an identity,
//                         // an EOSIO account, and a reference
//                         // to an eosjs object we can send a transaction.
//                         // ----------------------------

//                         // Never assume the account's permission/authority. Always take it from the returned account.
//                         const transactionOptions = {
//                             authorization: [`${account.name}@${account.authority}`],
//                         };

//                         eos.transfer(
//                             account.name,
//                             'gmaslaunches',
//                             '1.0000 EOS',
//                             'memo',
//                             transactionOptions
//                         )
//                             .then((trx) => {
//                                 // That's it!
//                                 console.log(`Transaction ID: ${trx.transaction_id}`);
//                             })
//                             .catch((error) => {
//                                 console.error(error);
//                             });
//                     })
//                     .catch((error) => {
//                         // The user rejected this request, or doesn't have the appropriate requirements.
//                         console.error(error);
//                     });
//             });
//         }
//     }

//     handleWindowSizeChange() {
//         const { resize, mobile } = this.props;
//         const headerMobile = isHeaderMobile();
//         if (headerMobile !== mobile) {
//             resize(headerMobile);
//         }
//     }

//     isLinkSelected(title) {
//         const link = '/' + title.toLowerCase().replace(' ', '-');
//         return title === 'Home'
//             ? this.props.loc.pathname === '/'
//             : this.props.loc.pathname === link;
//     }

//     getPath(title) {
//         return title === 'Home' ? '/' : '/' + title.toLowerCase().replace(' ', '-');
//     }

//     getAuthButton(auth) {
//         const { loc, mobile, resetAuthentication } = this.props;
//         const { attempted, result } = auth;
//         return attempted && result === 'OK' ? (
//             <HeaderLink
//                 className="w3-bar-item w3-button w3-right"
//                 to="/"
//                 onClick={resetAuthentication}
//                 title={'Logout'}
//                 mobile={mobile}
//             />
//         ) : (
//             getButton(loc, mobile)
//         );
//     }

//     render() {
//         const { auth, classes, mobile } = this.props;
//         const { attempted, result } = auth;
//         const authButton = this.getAuthButton(auth);
//         const linkClassName = mobile ? classes.link : classes.unadorned;

//         return (
//             <nav className={classes.header}>
//                 <EventListener target="window" onResize={this.handleWindowSizeChange} />
//                 <div className="w3-top w3-black">
//                     <div className="w3-bar">
//                         {otherHeaderLinks.map((title) => (
//                             <div className={linkClassName} key={title}>
//                                 <HeaderLink
//                                     mobile={mobile}
//                                     style={{
//                                         color: this.isLinkSelected(title) ? '03c0fe' : '#51a39a',
//                                     }}
//                                     className="w3-bar-item w3-button"
//                                     to={this.getPath(title)}
//                                     title={title}
//                                 />
//                             </div>
//                         ))}
//                         <div className={linkClassName}>{authButton}</div>
//                     </div>
//                 </div>
//             </nav>
//         );
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         auth: state.auth,
//         mobile: state.mobile,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         resetAuthentication: () => {
//             dispatch(createResetAuthAction());
//         },
//         resize: (mobile) => {
//             dispatch(createResizeEventAction(mobile));
//         },
//     };
// };

// export const EOSHeader = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(withStyles(styles)(EOSHeaderComponent));

// function getButton(loc, mobile) {
//     const style = { color: '#51a39a' };

//     if (loc.pathname === '/') {
//         return (
//             <HeaderLink
//                 className="w3-bar-item w3-button w3-right"
//                 to="/login"
//                 style={style}
//                 title={'Login'}
//                 mobile={mobile}
//             />
//         );
//     } else if (loc.pathname === '/login') {
//         return (
//             <HeaderLink
//                 className="w3-bar-item w3-button w3-right"
//                 to="/register"
//                 style={style}
//                 title={'Register'}
//                 mobile={mobile}
//             />
//         );
//     }
//     return (
//         <HeaderLink
//             className="w3-bar-item w3-button w3-right"
//             to="/login"
//             style={style}
//             title={'Login'}
//             mobile={mobile}
//         />
//     );
// }

// // <div
// //   id="spinner"
// //   style="
// //                  "
// // >
// //   Loading
// //   <div
// //     class="fb-login-button"
// //     data-max-rows="1"
// //     data-size="large"
// //     data-button-type="continue_with"
// //     data-use-continue-as="true"
// //   />
// // </div>;
