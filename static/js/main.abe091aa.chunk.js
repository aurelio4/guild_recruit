(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{45:function(e,t,a){e.exports=a(76)},50:function(e,t,a){},74:function(e,t,a){},76:function(e,t,a){"use strict";a.r(t);var l=a(1),n=a.n(l),i=a(23),s=a.n(i),o=(a(50),a(14)),r=a(15),c=a(18),d=a(16),u=a(4),g=a(17),h=a(31),m=a.n(h);m.a.initializeApp({apiKey:"AIzaSyCfRNMojIm31NBzNqvRpyrtgXBV4l3NpLM",authDomain:"guild-recruit.firebaseapp.com",databaseURL:"https://guild-recruit.firebaseio.com",projectId:"guild-recruit",storageBucket:"guild-recruit.appspot.com",messagingSenderId:"39854529631",appId:"1:39854529631:web:84a8510aaaa11a1f"}),m.a.database();var f=m.a,E=a(77),p=a(78),b=a(79),v=a(80),S=a(81),y=a(82),k=a(40),D=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(d.a)(t).call(this,e))).checkUserLoggedIn=a.checkUserLoggedIn.bind(Object(u.a)(a)),a.state={userLoggedIn:!1},a}return Object(g.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.checkUserLoggedIn()}},{key:"checkUserLoggedIn",value:function(){var e=this;f.auth().onAuthStateChanged(function(t){t?e.setState({userLoggedIn:!0}):e.setState({userLoggedIn:!1})})}},{key:"render",value:function(){return n.a.createElement(E.a,{sm:"4"},n.a.createElement(p.a,{body:!0,inverse:!0,className:"the-boxes",style:{backgroundColor:"#333",borderColor:"#FFF"}},n.a.createElement(b.a,{className:"guild-box"},n.a.createElement(v.a,{className:this.props.guildFaction},this.props.guildName),n.a.createElement(S.a,{className:"ras text-muted"},this.props.guildRegion),n.a.createElement(S.a,{className:"ras text-muted"},this.props.guildServer),n.a.createElement("hr",{className:"hr-divider"}),n.a.createElement(y.a,null,this.props.guildDesc),this.state.userLoggedIn?[n.a.createElement(k.a,null,"Apply"),n.a.createElement(k.a,{className:"btn-spacing"},"Contact")]:" ")))}}]),t}(n.a.Component),U=a(24),N=a(83),O=a(84),C=a(105),j=a(85),M=a(86),G=a(87),R=a(88),F=a(89),w=a(90),I=a(91),A=a(92),L=a(93),P=a(94),x=a(95),B=a(96),H=a(44),J=a(97),T=a(98),W=a(99),V=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(d.a)(t).call(this,e))).logout=a.logout.bind(Object(u.a)(a)),a.toggleProfile=a.toggleProfile.bind(Object(u.a)(a)),a.updateUsername=a.updateUsername.bind(Object(u.a)(a)),a.setUserProfile=a.setUserProfile.bind(Object(u.a)(a)),a.deleteUserProfile=a.deleteUserProfile.bind(Object(u.a)(a)),a.handleChange=a.handleChange.bind(Object(u.a)(a)),a.getUserInfo=a.getUserInfo.bind(Object(u.a)(a)),a.getUserEmail=a.getUserEmail.bind(Object(u.a)(a)),a.toggleAddGuild=a.toggleAddGuild.bind(Object(u.a)(a)),a.toggleManageGuild=a.toggleManageGuild.bind(Object(u.a)(a)),a.toggleDeleteModal=a.toggleDeleteModal.bind(Object(u.a)(a)),a.addGuildToDB=a.addGuildToDB.bind(Object(u.a)(a)),a.toggleRegionSelect=a.toggleRegionSelect.bind(Object(u.a)(a)),a.toggleFactionSelect=a.toggleFactionSelect.bind(Object(u.a)(a)),a.setEditDisabled=a.setEditDisabled.bind(Object(u.a)(a)),a.setRegionEU=a.setRegionEU.bind(Object(u.a)(a)),a.setRegionUS=a.setRegionUS.bind(Object(u.a)(a)),a.setFactionA=a.setFactionA.bind(Object(u.a)(a)),a.setFactionH=a.setFactionH.bind(Object(u.a)(a)),a.checkGuildData=a.checkGuildData.bind(Object(u.a)(a)),a.ucFirst=a.ucFirst.bind(Object(u.a)(a)),a.getGuildInfo=a.getGuildInfo.bind(Object(u.a)(a)),a.state={profileModal:!1,addGuildModal:!1,manageGuildModal:!1,deleteModal:!1,editDisabled:!0,profileUsername:"",profileEmail:"",profileDiscord:"",profileUid:"",guildName:"",guildNameError:"",guildRegion:"",guildRegionError:"",guildServer:"",guildServerError:"",guildDesc:"",guildDescError:"",guildFaction:"",guildFactionError:"",factionColor:"secondary",regionSelect:!1,factionSelect:!1,userHasGuild:!1},a}return Object(g.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.getUserEmail()}},{key:"logout",value:function(){f.auth().signOut()}},{key:"updateUsername",value:function(e){this.setState({profileUsername:e})}},{key:"handleChange",value:function(e){this.setState(Object(U.a)({},e.target.name,e.target.value))}},{key:"ucFirst",value:function(e){return"string"!==typeof e?"":e.charAt(0).toUpperCase()+e.slice(1)}},{key:"setRegionEU",value:function(){this.setState({guildRegion:"EU"})}},{key:"setRegionUS",value:function(){this.setState({guildRegion:"US"})}},{key:"setFactionA",value:function(){this.setState({guildFaction:"Alliance"}),this.setState({factionColor:"primary"})}},{key:"setFactionH",value:function(){this.setState({guildFaction:"Horde"}),this.setState({factionColor:"danger"})}},{key:"setEditDisabled",value:function(){this.setState(function(e){return{editDisabled:!e.editDisabled}})}},{key:"toggleProfile",value:function(){this.setState(function(e){return{profileModal:!e.profileModal}})}},{key:"toggleAddGuild",value:function(){this.setState(function(e){return{addGuildModal:!e.addGuildModal}})}},{key:"toggleManageGuild",value:function(){this.setState(function(e){return{manageGuildModal:!e.manageGuildModal}})}},{key:"toggleDeleteModal",value:function(){this.setState(function(e){return{deleteModal:!e.deleteModal}})}},{key:"toggleRegionSelect",value:function(){this.setState(function(e){return{regionSelect:!e.regionSelect}})}},{key:"toggleFactionSelect",value:function(){this.setState(function(e){return{factionSelect:!e.factionSelect}})}},{key:"checkGuildData",value:function(){this.setState({guildDescError:"",guildNameError:"",guildRegionError:"",guildServerError:"",guildFactionError:"",successfulGuildLog:!1}),this.state.guildName?this.state.guildRegion?this.state.guildFaction?this.state.guildServer?this.state.guildDesc?this.state.guildName.length<3||this.state.guildName.length>24?this.setState({guildNameError:"Error in Guild Name length!"}):this.state.guildDesc.length>140?this.setState({guildDescError:"Description is too long!"}):this.state.guildDesc.length<10?this.setState({guildDescError:"Description is too short!"}):this.addGuildToDB():this.setState({guildDescError:"Description is blank!"}):this.setState({guildServerError:"Server is blank!"}):this.setState({guildFactionError:"Faction isn't chosen!"}):this.setState({guildRegionError:"Region isn't chosen!"}):this.setState({guildNameError:"Guild Name is empty!"})}},{key:"getUserEmail",value:function(){var e=this;f.auth().onAuthStateChanged(function(t){if(t){var a=f.auth().currentUser.uid;e.setState({profileEmail:t.email}),e.setState({profileUid:a}),f.firestore().collection("users").doc(e.state.profileUid).get().then(function(t){if(t.exists){var a=JSON.stringify(t.data()),l=JSON.parse(a);e.setState({profileUsername:l.username})}}),f.firestore().collection("guilds").doc(e.state.profileUid).get().then(function(t){t.exists?e.setState({userHasGuild:!0}):console.log("No guild exists for this user!")})}else t||console.log("No user!")})}},{key:"getUserInfo",value:function(){var e=this;f.firestore().collection("users").doc(this.state.profileUid).get().then(function(t){if(t.exists){var a=JSON.stringify(t.data()),l=JSON.parse(a);e.setState({profileUsername:l.username}),e.setState({profileDiscord:l.discord})}else console.log("No such document")}).catch(function(e){console.log("Error getting document from DB: ",e)})}},{key:"getGuildInfo",value:function(){var e=this;f.firestore().collection("guilds").doc(this.state.profileUid).get().then(function(t){if(t.exists){var a=JSON.stringify(t.data()),l=JSON.parse(a);e.setState({guildName:l.guildName,guildFaction:l.guildFaction,guildRegion:l.guildRegion.slice(0,-1),guildServer:l.guildServer,guildDesc:l.guildDesc})}else console.log("No such document!")}).catch(function(e){console.log("Error getting info from DB: ",e)})}},{key:"setUserProfile",value:function(){f.firestore().collection("users").doc(this.state.profileUid).set({username:this.state.profileUsername,discord:this.state.profileDiscord,email:this.state.profileEmail}).then(function(){console.log("Written to Firestore")}).catch(function(e){console.log("Error writing to DB: ",e)})}},{key:"deleteUserProfile",value:function(){f.firestore().collection("users").doc(this.state.profileUid).delete().then(function(){console.log("Document deleted successfully"),!0&&f.auth().currentUser.delete().then(function(){console.log("User deleted successfully")}).catch(function(e){console.log("Error deleting user: ",e)})}).catch(function(e){console.log("Error deleting document: ",e)})}},{key:"addGuildToDB",value:function(){var e=this;f.firestore().collection("guilds").doc(this.state.profileUid).set({guildName:this.state.guildName,guildRegion:this.state.guildRegion+"-",guildServer:this.ucFirst(this.state.guildServer),guildDesc:this.ucFirst(this.state.guildDesc),guildFaction:this.ucFirst(this.state.guildFaction)}).then(function(){console.log("Successfully written to Firestore"),e.toggleAddGuild(),e.setState({userHasGuild:!0})}).catch(function(e){console.log("Error writing to DB: ",e)})}},{key:"render",value:function(){var e=this;return[n.a.createElement(N.a,null,n.a.createElement(O.a,{href:"#",onClick:function(){e.toggleProfile(),e.getUserInfo()}}," ",this.state.profileUsername?this.state.profileUsername:"Loading.."," "),n.a.createElement(C.a,{isOpen:this.state.profileModal,toggle:this.toggleProfile},n.a.createElement(j.a,null,n.a.createElement(M.a,null,n.a.createElement(G.a,null,n.a.createElement(R.a,{style:{color:"#000"},for:"username"},"Username"),n.a.createElement(F.a,{type:"username",name:"profileUsername",value:this.state.profileUsername,onChange:this.handleChange,disabled:this.state.editDisabled})),n.a.createElement(G.a,null,n.a.createElement(R.a,{style:{color:"#000"},for:"email"},"Email"),n.a.createElement(F.a,{type:"email",name:"email",value:this.state.profileEmail,disabled:!0})),n.a.createElement(G.a,null,n.a.createElement(R.a,{style:{color:"#000"},for:"discord"},"Discord"),n.a.createElement(F.a,{type:"text",name:"profileDiscord",value:this.state.profileDiscord,onChange:this.handleChange,disabled:this.state.editDisabled}),n.a.createElement(w.a,{color:"muted"},"Example: chelk#4281")),n.a.createElement(k.a,{className:"btn-float-r btn-spacing",color:"secondary",onClick:this.toggleProfile},"Close"),this.state.editDisabled?n.a.createElement(k.a,{className:"btn-float-r btn-spacing",color:"info",onClick:this.setEditDisabled},"Edit"):n.a.createElement(k.a,{className:"btn-float-r btn-spacing",color:"success",onClick:function(){e.setEditDisabled(),e.setUserProfile(),e.toggleProfile()}},"Update"))))),n.a.createElement(I.a,{nav:!0,inNavbar:!0},n.a.createElement(A.a,{nav:!0,caret:!0},"Options"),n.a.createElement(L.a,{right:!0},this.state.userHasGuild?n.a.createElement(P.a,{onClick:function(){e.getGuildInfo(),e.toggleManageGuild()}}," Manage Guild "):n.a.createElement(P.a,{onClick:this.toggleAddGuild},"Add Guild"),n.a.createElement(C.a,{isOpen:this.state.manageGuildModal,toggle:this.toggleManageGuild},n.a.createElement(j.a,null,n.a.createElement(M.a,null,n.a.createElement(G.a,null,n.a.createElement(R.a,{style:{color:"#000"},for:"guildName"},"Guild Name"),n.a.createElement(F.a,{className:"info-font",type:"text",name:"guildName",defaultValue:this.state.guildName,disabled:!0})),n.a.createElement(G.a,null,n.a.createElement(R.a,{style:{color:"#000"},for:" guild"},"Guild Server"),n.a.createElement(x.a,null,n.a.createElement(B.a,{addonType:"prepend"},n.a.createElement(H.a,{className:"info-font"},this.state.guildFaction),n.a.createElement(H.a,{className:"info-font"},this.state.guildRegion)),n.a.createElement(F.a,{className:"info-font",type:"text",name:"guildName",defaultValue:this.state.guildServer,disabled:!0}))),n.a.createElement(G.a,null,n.a.createElement(R.a,{style:{color:"#000"},for:"guildDesc"},"Guild Description"),n.a.createElement(F.a,{className:"info-font",type:"textarea",name:"guildDesc",defaultValue:this.state.guildDesc,disabled:!0})),n.a.createElement(k.a,{className:"btn-float-r btn-spacing",color:"secondary",onClick:this.toggleManageGuild},"Close")))),n.a.createElement(C.a,{isOpen:this.state.addGuildModal,toggle:this.toggleAddGuild},n.a.createElement(j.a,null,n.a.createElement(M.a,null,n.a.createElement(G.a,null,n.a.createElement(J.a,{color:"danger",className:"badge-spacing visible"},this.state.guildNameError),n.a.createElement(F.a,{type:"text",name:"guildName",value:this.state.guildName,onChange:this.handleChange,placeholder:"Guild Name"})),n.a.createElement(G.a,null,n.a.createElement(J.a,{color:"danger",className:"badge-spacing visible"},this.state.guildFactionError,this.state.guildRegionError,this.state.guildServerError),n.a.createElement(x.a,null,n.a.createElement(T.a,{addonType:"append",isOpen:this.state.factionSelect,toggle:this.toggleFactionSelect},n.a.createElement(A.a,{color:this.state.factionColor},this.state.guildFaction?this.state.guildFaction:"Faction"),n.a.createElement(L.a,null,n.a.createElement(P.a,{onClick:this.setFactionA},"Alliance"),n.a.createElement(P.a,{onClick:this.setFactionH},"Horde"))),n.a.createElement(T.a,{addonType:"append",isOpen:this.state.regionSelect,toggle:this.toggleRegionSelect},n.a.createElement(A.a,null,this.state.guildRegion?this.state.guildRegion:"Region"),n.a.createElement(L.a,null,n.a.createElement(P.a,{onClick:this.setRegionEU},"EU"),n.a.createElement(P.a,{onClick:this.setRegionUS},"US"))),n.a.createElement(F.a,{type:"text",name:"guildServer",value:this.state.guildServer,onChange:this.handleChange,placeholder:"Server Name"}))),n.a.createElement(G.a,null,n.a.createElement(J.a,{color:"danger",className:"badge-spacing visible"},this.state.guildDescError),n.a.createElement(F.a,{type:"textarea",name:"guildDesc",value:this.state.guildDesc,onChange:this.handleChange,placeholder:"Description"}),n.a.createElement(w.a,{color:this.state.guildDesc.length>140?"danger":"muted"},"Character count: ",this.state.guildDesc.length," / 140")),n.a.createElement(k.a,{className:"btn-float-r btn-spacing",color:"secondary",onClick:this.toggleAddGuild},"Close"),n.a.createElement(k.a,{className:"btn-float-r",color:"success",onClick:function(){e.state.successfulGuildLog,e.checkGuildData()}},"Add")))),this.state.userHasGuild?n.a.createElement(P.a,null," Show Applicants"):n.a.createElement(P.a,null," Show Applications"),n.a.createElement(P.a,{divider:!0}),n.a.createElement(P.a,{onClick:this.toggleDeleteModal},"Delete Account"),n.a.createElement(C.a,{isOpen:this.state.deleteModal,toggle:this.toggleDeleteModal},n.a.createElement(j.a,null,n.a.createElement("span",{className:"delete-font"},"Are you sure you want to permanently delete your account? Doing so will delete the following:",n.a.createElement("ul",{className:"no-dots"},n.a.createElement("li",null," - Guild (If applicable)"),n.a.createElement("li",null," - Guild applications (If applicable)"),n.a.createElement("li",null," - Profile")))),n.a.createElement(W.a,null,n.a.createElement(k.a,{color:"success",onClick:function(){e.deleteUserProfile(),e.toggleDeleteModal()}},"Delete"),n.a.createElement(k.a,{color:"danger",onClick:this.toggleDeleteModal},"Nevermind"))),n.a.createElement(P.a,{onClick:this.logout},"Log Out")))]}}]),t}(n.a.Component),z=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(d.a)(t).call(this,e))).login=a.login.bind(Object(u.a)(a)),a.signup=a.signup.bind(Object(u.a)(a)),a.handleChange=a.handleChange.bind(Object(u.a)(a)),a.toggleLoginModal=a.toggleLoginModal.bind(Object(u.a)(a)),a.toggleRegisterModal=a.toggleRegisterModal.bind(Object(u.a)(a)),a.checkPlayerData=a.checkPlayerData.bind(Object(u.a)(a)),a.getUsernames=a.getUsernames.bind(Object(u.a)(a)),a.state={loginModal:!1,registerModal:!1,dbUsernames:[],username:"",usernameError:"",discord:"",discordError:"",email:"",emailError:"",password:"",passwordError:"",uid:""},a}return Object(g.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.getUsernames()}},{key:"login",value:function(e){f.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then(function(e){}).catch(function(e){console.log(e)})}},{key:"signup",value:function(e){var t=this;f.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then(function(){var e=f.auth().currentUser.uid;t.setState({uid:e}),f.firestore().collection("users").doc(t.state.uid).set({username:t.state.username,discord:t.state.discord,email:t.state.email}).then(function(){console.log("Document successfully written")}).catch(function(e){console.log(e)})})}},{key:"handleChange",value:function(e){this.setState(Object(U.a)({},e.target.name,e.target.value))}},{key:"getUsernames",value:function(){var e=this;f.firestore().collection("users").get().then(function(t){t.forEach(function(t){e.state.dbUsernames.push(t.data().username),console.log(e.state.dbUsernames),console.log(e.state.dbUsernames[1])})})}},{key:"checkPlayerData",value:function(){this.setState({usernameError:"",discordError:"",emailError:"",passwordError:""}),this.state.email?this.state.password?this.state.username?this.state.discord?this.state.username.length>14?this.setState({usernameError:"Username is too long!"}):this.state.username.length<3?this.setState({usernameError:"Username is too short!"}):this.state.username.length>3&&this.state.username.length<14||(this.signup(),this.toggleRegisterModal()):this.setState({discordError:"Discord field is empty!"}):this.setState({usernameError:"Username field is empty!"}):this.setState({passwordError:"Password field is empty!"}):this.setState({emailError:"Email field is empty!"})}},{key:"toggleLoginModal",value:function(){this.setState(function(e){return{loginModal:!e.loginModal}})}},{key:"toggleRegisterModal",value:function(){this.setState(function(e){return{registerModal:!e.registerModal}})}},{key:"render",value:function(){var e=this;return[n.a.createElement(N.a,null,n.a.createElement(O.a,{href:"#",onClick:this.toggleRegisterModal}," Register "),n.a.createElement(C.a,{isOpen:this.state.registerModal,toggle:this.toggleRegisterModal},n.a.createElement(j.a,null,n.a.createElement(M.a,null,n.a.createElement(G.a,null,n.a.createElement(J.a,{color:"danger",className:"badge-spacing"},this.state.emailError),n.a.createElement(F.a,{type:"email",name:"email",value:this.state.email,onChange:this.handleChange,placeholder:"Email"})),n.a.createElement(G.a,null,n.a.createElement(J.a,{color:"danger",className:"badge-spacing"},this.state.passwordError),n.a.createElement(F.a,{type:"password",name:"password",value:this.state.password,onChange:this.handleChange,placeholder:"Password"})),n.a.createElement(G.a,null,n.a.createElement(J.a,{color:"danger",className:"badge-spacing"},this.state.usernameError),n.a.createElement(F.a,{type:"username",name:"username",value:this.state.username,onChange:this.handleChange,placeholder:"Username"})),n.a.createElement(G.a,null,n.a.createElement(J.a,{color:"danger",className:"badge-spacing"},this.state.discordError),n.a.createElement(F.a,{type:"text",name:"discord",value:this.state.discord,onChange:this.handleChange,placeholder:"Discord"}),n.a.createElement(w.a,{color:"muted"},"Example: chelk#4281"))),n.a.createElement(k.a,{className:"btn-float-r btn-spacing",color:"danger",onClick:this.toggleRegisterModal},"Close"),n.a.createElement(k.a,{className:"btn-float-r",color:"success",onClick:function(){e.checkPlayerData()}}," Register ")))),n.a.createElement(N.a,null,n.a.createElement(O.a,{href:"#",onClick:this.toggleLoginModal}," Login "),n.a.createElement(C.a,{isOpen:this.state.loginModal,toggle:this.toggleLoginModal},n.a.createElement(j.a,null,n.a.createElement(M.a,null,n.a.createElement(G.a,null,n.a.createElement(F.a,{type:"email",name:"email",value:this.state.email,onChange:this.handleChange,placeholder:"Email"})),n.a.createElement(G.a,null,n.a.createElement(F.a,{type:"password",name:"password",value:this.state.password,onChange:this.handleChange,placeholder:"Password"}))),n.a.createElement(k.a,{className:"btn-float-r btn-spacing",color:"danger",onClick:this.toggleLoginModal},"Close"),n.a.createElement(k.a,{className:"btn-float-r",color:"success",onClick:function(){e.login(),e.toggleRegisterModal()}}," Log in "),n.a.createElement("p",{className:"error-message",color:"danger"},this.props.error))))]}}]),t}(n.a.Component),q=a(100),K=a(101),X=a(102),$=a(103),Q=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(d.a)(t).call(this,e))).toggleNav=a.toggleNav.bind(Object(u.a)(a)),a.authListener=a.authListener.bind(Object(u.a)(a)),a.state={isOpen:!1,user:{}},a}return Object(g.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.authListener()}},{key:"toggleNav",value:function(){this.setState({isOpen:!this.state.isOpen})}},{key:"authListener",value:function(){var e=this;f.auth().onAuthStateChanged(function(t){t?e.setState({user:t}):e.setState({user:null})})}},{key:"render",value:function(){return n.a.createElement(q.a,{className:"main-nav",color:"dark",dark:!0,expand:"md",sticky:"top"},n.a.createElement(K.a,{onClick:this.toggleNav}),n.a.createElement(X.a,{isOpen:this.state.isOpen,navbar:!0},n.a.createElement($.a,{className:"ml-auto",navbar:!0},this.state.user?n.a.createElement(V,null):n.a.createElement(z,null))))}}]),t}(n.a.Component),Y=a(104),Z=(a(74),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(d.a)(t).call(this,e))).getUserUID=a.getUserUID.bind(Object(u.a)(a)),a.guildInfo=a.guildInfo.bind(Object(u.a)(a)),a.renderCards=a.renderCards.bind(Object(u.a)(a)),a.state={profileUid:"",guilds:[]},a}return Object(g.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.guildInfo(),this.getUserUID()}},{key:"getUserUID",value:function(){var e=this;f.auth().onAuthStateChanged(function(t){if(t){var a=f.auth().currentUser.uid;e.setState({profileUid:a})}})}},{key:"guildInfo",value:function(){var e=this;f.firestore().collection("guilds").get().then(function(t){var a=[];t.forEach(function(e){a.push({id:e.id,guildDesc:e.data().guildDesc,guildFaction:e.data().guildFaction,guildName:e.data().guildName,guildRegion:e.data().guildRegion,guildServer:e.data().guildServer})}),e.setState({guilds:a},function(){return console.log(e.state)})})}},{key:"renderCards",value:function(){var e,t=this.state.guilds.map(function(t){return"Alliance"===t.guildFaction?e="guild-name -alliance":"Horde"===t.guildFaction&&(e="guild-name -horde"),console.log(t),n.a.createElement(D,{key:t.id,guildFaction:e,guildServer:t.guildServer,guildName:t.guildName,guildRegion:t.guildRegion,guildDesc:t.guildDesc})});return n.a.createElement(Y.a,null,t)}},{key:"render",value:function(){return n.a.createElement("div",{className:"main-div"},n.a.createElement(Q,null),this.renderCards())}}]),t}(n.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(75);s.a.render(n.a.createElement(Z,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[45,1,2]]]);
//# sourceMappingURL=main.abe091aa.chunk.js.map