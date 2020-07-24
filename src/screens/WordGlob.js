import React, { Component } from "react";
import Carousel from 'nuka-carousel'
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import '../styles.css';
import * as IMGS from '../common/images';
import {RADIUS_LINE} from '../common/consts'
import * as COLORS from '../common/colors'
//import * as UTILS from '../utils';

//import WordData from '../assets/data/words.json'
//import LatLon1 from '../assets/data/latlon1.json'
import Header from "../components/Header";

/** Redux Begin */
import WordDataActions from '../store/actions/WordData';
import LatitudeActions from '../store/actions/Latitude';
import LongitudeActions from '../store/actions/Longitude';
import AuthActions from '../store/actions/Auth';
import ReviewActions from '../store/actions/Review';
import GREMapActions from '../store/actions/GREMap';
import GuideActions from '../store/actions/Guide';

import {connect} from 'react-redux';
const mapStateToProps = (state) => {
    return {
        wordState: state.word_data,
        latitudeState: state.latitude,
        longitudeState: state.longitude,
        reviewState: state.review,
        userStudy: state.userstudy,
        greState: state.gremap,
        guideState: state.guide
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        wordDataGet: (lat_min, lat_max, lon_min, lon_max) => dispatch(WordDataActions.WordDataGet(lat_min, lat_max, lon_min, lon_max)),
        latitudeGet: () => dispatch(LatitudeActions.LatitudeGet()),
        longitudeGet: () => dispatch(LongitudeActions.LongitudeGet()),
        logout: () => dispatch(AuthActions.Logout()),
        getWordDataByPage: (pageNumber, pageSize, searchValue) => dispatch(ReviewActions.Get_WordData_ByPage(pageNumber, pageSize, searchValue)),
        saveUserStudy: (wordId, studyStatus, pageNumber, pageSize, searchValue) => dispatch(ReviewActions.Save_UserStudy(wordId, studyStatus, pageNumber, pageSize, searchValue)),
        seleclistUserStudy: (reviewed) => dispatch(ReviewActions.SelectList_UserStudy(reviewed)),
        greWordDataGet: (i_Nth) => dispatch(GREMapActions.GREWordDataGet(i_Nth)),
        greLatDataGet: (i_Nth) => dispatch(GREMapActions.GRELatitudeGet(i_Nth)),
        greLonDataGet: (i_Nth) => dispatch(GREMapActions.GRELongitudeGet(i_Nth)),
        guideShow: () => dispatch(GuideActions.GuideScreenShow()),
        guideHide: () => dispatch(GuideActions.GuideScreenHide())
    }
}
/** Redux End */

const ReviewDlg = ({ word, onOpenDetailDlg, hoverButton, onMouseEnterItem, onMouseLeaveItem, onClickKnown}) => (
    <div id="reviewdlg" style={{
        width: 465,
        height: 535,
        borderRadius: 30,
        filter: "drop-shadow(0px 3px 3.5px rgba(0,0,0,0.16))",
        backgroundColor: "#f2f3f5ef",
        position: "absolute",
        transform: "translate(0px, -50%)",
        top: "50%",
        right: 150,
        zIndex: 10001,
        padding: 30,
    }}>
        <div id={"review-"+word.word} style={{margin:"60px 0px", textAlign:'center', fontFamily:"Helvetica", fontWeight:"bold", fontSize:39}}>
            <span id={"review-prefix"+word.word} style={{color:COLORS.COLOR_ROOT}}>{word.config.prefix}</span>
            <span id={"review-root"+word.word} style={{color:COLORS.COLOR_ROOT}}>{word.config.root}</span>
            <span id={"review-suffix"+word.word} style={{color:COLORS.COLOR_SUFFIX}}>{word.config.suffix}</span>
            <span id={"review-tale"+word.word} style={{color:COLORS.COLOR_ROOT}}>{word.config.tale}</span>
        </div>
        <div id={"review-eng"+word.word} style={{textAlign:'left', fontFamily:"Helvetica", fontWeight:"bold", fontSize:24, padding:20}}>
            <span id={"review-chn-spn"+word.word} style={{color:COLORS.COLOR_DETAIL}}>{word.details.english}</span>
        </div>
        <div id={"review-chn"+word.word} style={{textAlign:'left', fontFamily:"Helvetica", fontWeight:"bold", fontSize:24, padding:20}}>
            <span id={"review-chn-spn"+word.word} style={{color:COLORS.COLOR_DETAIL}}>{word.details.chinese}</span>
        </div>
        <button id={"review-known"+word.word} style={{width: 168, height: 81, borderRadius: 31, borderWidth:0, backgroundColor: "#ffffff", position:"absolute", bottom:50, left:50, fontSize:30, color:"#1d1d1c", fontFamily:"Helvetica", fontWeight:300, cursor: hoverButton?'hand':'pointer'}}
            onClick={onClickKnown}
            onMouseEnter={onMouseEnterItem}
            onMouseLeave={onMouseLeaveItem}
        >
            <span id={"review-known-spn"+word.word}>Known</span>
        </button>
        <button id={"review-unknown"+word.word} style={{width: 168, height: 81, borderRadius: 31, borderWidth:0, backgroundColor: "#ffffff", position:"absolute", bottom:50, right:50, fontSize:30, color:"#1d1d1c", fontFamily:"Helvetica", fontWeight:300, cursor: hoverButton?'hand':'pointer'}}
            onClick={onOpenDetailDlg}
            onMouseEnter={onMouseEnterItem}
            onMouseLeave={onMouseLeaveItem}
        >
            <span id={"review-unknown-spn"+word.word}>Unknown</span>
        </button>
    </div>
)

const DetailDlg = ({word, onClickBack, hoverButton, onMouseEnterItem, onMouseLeaveItem}) => (
    <div id={"detail-"+word.word} style={{
        width: 907,
        height: 404,
        borderRadius: 34,
        filter: "drop-shadow(0px 3px 3.5px rgba(0,0,0,0.16))",
        backgroundColor: "#f2f3f5",
        position: "absolute",
        transform: "translate(50%, -50%)",
        top: "50%",
        right: "50%",
        zIndex: 10001,
    }}>
        <div id={"detail-"+word.word} style={{marginTop:30, textAlign:'center', fontFamily:"Helvetica", fontWeight:"bold", fontSize:39}}>
            <span id={"detail-prefix"+word.word} style={{color:COLORS.COLOR_ROOT}}>{word.config.prefix}</span>
            <span id={"detail-root"+word.word} style={{color:COLORS.COLOR_ROOT}}>{word.config.root}</span>
            <span id={"detail-suffix"+word.word} style={{color:COLORS.COLOR_SUFFIX}}>{word.config.suffix}</span>
            <span id={"detail-tale"+word.word} style={{color:COLORS.COLOR_ROOT}}>{word.config.tale}</span>
        </div>
        <div id={"detail-pron"+word.word} style={{textAlign:'center', fontFamily:"Helvetica", fontWeight:"bold", fontSize:25, paddingTop:20}}>
            <span id={"detail-chn-spn"+word.word} style={{color:COLORS.COLOR_DETAIL}}>{word.details.pronun}</span>
        </div>
        <div id={"detail-eng"+word.word} style={{textAlign:'left', fontFamily:"Helvetica", fontSize:18, paddingLeft:150, paddingRight:150, paddingTop:20}}>
            <span id={"detail-chn-spn"+word.word} style={{color:COLORS.COLOR_DETAIL}}>{word.details.english}</span>
        </div>
        <div id={"detail-chn"+word.word} style={{textAlign:'left', fontFamily:"Helvetica", fontSize:18, paddingLeft:150, paddingRight: 150, paddingTop:20}}>
            <span id={"detail-chn-spn"+word.word} style={{color:COLORS.COLOR_DETAIL}}>{word.details.chinese}</span>
        </div>
        <div id={"detail-ex"+word.word} style={{textAlign:'left', fontFamily:"Helvetica", fontSize:18, paddingLeft:150, paddingRight: 150, paddingTop:20}}>
            <span id={"detail-chn-spn"+word.word} style={{color:COLORS.COLOR_DETAIL}}>{word.details.example}</span>
        </div>
        <button id={"detail-btn-back"+word.word} style={{width: 86, background:"#00000000", border:"none", position:"absolute", top:30, left:30, fontSize: 25, color: "#52575a", fontFamily: "Helvetica", fontWeight: 500, cursor: hoverButton?'hand':'pointer'}}
            onClick={onClickBack}
            onMouseEnter={onMouseEnterItem}
            onMouseLeave={onMouseLeaveItem}
        >
            <img src={IMGS.IMG_BACK} style={{width:19, height:24, position:'absolute', top:3, left:0}} alt={"NONE"}></img>
            <span id={"detail-btn-span"} style={{marginLeft:20}}>Back</span>    
        </button>
    </div>
)

class WordGlob extends Component {

    constructor(props) {
        super(props);
        this.animate = this.animate.bind(this);
        this.initializeCamera = this.initializeCamera.bind(this);
        this.initializeOrbits = this.initializeOrbits.bind(this);
        this.initializeLight = this.initializeLight.bind(this);
        this.drawWordGlobe = this.drawWordGlobe.bind(this);

        this.state = {
            words: [],//WordData.words,
            wordsRnd: null,
            wordsRndLat: null,
            wordsRndLon: null,
            latLabels: [],//LatLon1.lat,
            lonLabels: [],//LatLon1.lon,
            isLoading: true,
            zoomLevel: 1,
            showReviewDlg: false,
            showDetailDlg: false,
            hoverWord: false,
            hoverButton: false,
            selectedWord: null,
            selectedWordIndex: null,
            i_Nth: 0,
            staticLatCnt: 84,
            guideImgs:[
                IMGS.IMG_GUIDE_WORDGLOB_1,
                IMGS.IMG_GUIDE_WORDGLOB_2,
                IMGS.IMG_GUIDE_WORDGLOB_3,
                IMGS.IMG_GUIDE_WORDGLOB_4,
                IMGS.IMG_GUIDE_WORDGLOB_5,
                IMGS.IMG_GUIDE_WORDGLOB_6,
                IMGS.IMG_GUIDE_WORDGLOB_7,
                IMGS.IMG_GUIDE_WORDGLOB_8,
                IMGS.IMG_GUIDE_WORDGLOB_9,
                IMGS.IMG_GUIDE_WORDGLOB_10,
            ],
            guideDesc:[
                "Half Known Words \n Half Unknown Words",
                "Click THE Word\n For Meaning",
                "The KNOWN Word REFLECT IN THE PROCESS BAR",
                "The UNKNOWN Word\n WILL SHOW MORE DETAIL MEANING",
                "Back for previous page",
                "Click\n Zoom In +",
                "The Word Separate Into Two Parts \n circumspect = circum+spect",
                "Words With The Same Root\n describe - circumscribe",
                "Words With The Same Prefix\n circumspect - circumscribe",
                "Words With The Same Meaning\n circumspect= scruple"
            ]
        }
    }

    drawWordGlobe(){
        if(this.frameId){
            cancelAnimationFrame(this.frameId);
            this.mount.removeChild(this.renderer.domElement);
        }
        var width = this.mount.clientWidth;
        var height = this.mount.clientHeight;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xffffff);

        this.camera = new THREE.PerspectiveCamera(12, width / height, 1, 20000);
        
        this.renderer = new THREE.WebGLRenderer({ antialias: false });
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        
        this.controls.addEventListener("change", (e) => {
            this.setState({})
        })
        this.controls.enablePan = false;
        this.controls.enableZoom = false;
        //this.controls.maxPolarAngle = Math.PI* 7/8.5;
        //this.controls.minPolarAngle = Math.PI*1.5/8.5;    
        this.renderer.setSize(width, height);
                
        this.initializeOrbits();
        this.initializeCamera();
        this.initializeLight();

        this.objects = new THREE.Object3D();
        this.scene.add( this.objects );

        const geometry = new THREE.SphereGeometry( 100, 40, 40 );

        new THREE.TextureLoader().load(this.textureSrc, (txtr) => {
            const material = new THREE.MeshPhongMaterial({ map: txtr });
            const sphere = new THREE.Mesh( geometry, material ); 
    
            this.objects.add(sphere);
            this.lineMaterialCont = new THREE.LineBasicMaterial( { color : COLORS.COLOR_LATLON, linewidth: 1, linecap: 'round', linejoin:  'round' } );
            this.lineMaterialDash = new THREE.LineDashedMaterial( { color: COLORS.COLOR_LATLON, linewidth: 5, scale: 1, dashSize: 0.5, gapSize: 1.5, } );
            this.mount.appendChild(this.renderer.domElement);
            this.drawLatLon(this.lineMaterialDash);
            this.animate();    
        }, (err) => {
            console.log(err);
        });
    }

    drawLatLon(lineMaterial, zl){
        if(zl <= 1 || zl > 3) return;
        var latlon = new THREE.Object3D();

        this.lineMaterial = lineMaterial

        var curve = new THREE.EllipseCurve(
        0,  0,
        RADIUS_LINE, RADIUS_LINE,
        0,  2 * Math.PI,
        false,
        0
        );		
        var points = curve.getPoints( 50 );
        var geometry = new THREE.BufferGeometry().setFromPoints( points );
        var circle_template = new THREE.Line( geometry, this.lineMaterial );
        circle_template.computeLineDistances();
        var i, circle, radScale;
        //var cntLat = this.state.latLabels.length
        var cntLon = this.state.lonLabels.length

        if(zl === 2){
            this.controls.maxPolarAngle = Math.PI* 7.3/8.5;
            this.controls.minPolarAngle = Math.PI*1.2/8.5;    
            for (i = 0; i < cntLon/2; i ++) {
                circle = circle_template.clone();
                circle.rotateOnAxis(new THREE.Vector3(0, 1, 0), i * Math.PI / (cntLon/4));
                latlon.add(circle);
            }
            
            // for (i = 0; i < cntLat/2; i ++) { 
            //     circle = circle_template.clone();
            //     circle.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
            
            //     radScale = Math.cos((i - (cntLat/4)) * Math.PI / (cntLat/2));
            //     circle.scale.set(radScale, radScale, radScale);
            //     circle.translateZ(100 * Math.sin((i - (cntLat/4)) * Math.PI / (cntLat/2)));
            //     latlon.add(circle);
            // }    

            for (i = 0; i < this.state.staticLatCnt/2; i ++) { 
                circle = circle_template.clone();
                circle.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
            
                radScale = Math.cos((i - (this.state.staticLatCnt/4)) * Math.PI / (this.state.staticLatCnt/2));
                circle.scale.set(radScale, radScale, radScale);
                circle.translateZ(100 * Math.sin((i - (this.state.staticLatCnt/4)) * Math.PI / (this.state.staticLatCnt/2)));
                latlon.add(circle);
            }    
        }
        if(zl === 3){
            this.controls.maxPolarAngle = Math.PI* 15.5/17;
            this.controls.minPolarAngle = Math.PI*2/17;    
            for (i = 0; i < cntLon; i ++) {
                circle = circle_template.clone();
                circle.rotateOnAxis(new THREE.Vector3(0, 1, 0), i * Math.PI / (cntLon/2));
                latlon.add(circle);
            }
        
            // for (i = 0; i < cntLat; i ++) {
            //     circle = circle_template.clone();
            //     circle.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
            
            //     radScale = Math.cos((i - cntLat/2) * Math.PI / cntLat);
            //     circle.scale.set(radScale, radScale, radScale);
            //     circle.translateZ(100 * Math.sin((i - cntLat/2) * Math.PI / cntLat));
            //     latlon.add(circle);
            // }    

            for (i = 0; i < this.state.staticLatCnt; i ++) {
                circle = circle_template.clone();
                circle.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
            
                radScale = Math.cos((i - this.state.staticLatCnt/2) * Math.PI / this.state.staticLatCnt);
                circle.scale.set(radScale, radScale, radScale);
                circle.translateZ(100 * Math.sin((i - this.state.staticLatCnt/2) * Math.PI / this.state.staticLatCnt));
                latlon.add(circle);
            }  
        }
        latlon.name = "latlon"
        this.objects.add(latlon)
    }

    zoomIn(){
        //console.log(this.state.zoomLevel);
        if(this.state.zoomLevel === 3) return;
        this.intervalZoom = setInterval(()=> {
            this.camera.scale.z += 0.1
            this.objects.remove(this.scene.getObjectByName("latlon"));
            this.drawLatLon(this.lineMaterialDash, this.state.zoomLevel+1);
        }, 30)
        // this.controls.autoRotate=true;
        // this.controls.autoRotateSpeed=0.5;
        this.timeout = setTimeout(()=>{
            //this.controls.autoRotate=false;
            if(this.state.zoomLevel === 1){
                this.camera.scale.z = 4.2;
            }
            if(this.state.zoomLevel === 2){
                this.camera.scale.z = 7.2;     
            }
            this.setState({zoomLevel: this.state.zoomLevel+1})
            clearInterval(this.intervalZoom);
        }, 901);
        //this.setState({zoomLevel:2});
    }

    zoomOut(){
        //if(this.camera.scale.z < 3) return;
        //console.log(this.state.zoomLevel);
        if(this.state.zoomLevel === 1) return;
        this.intervalZoom = setInterval(()=> {
            this.camera.scale.z -= 0.1
            this.objects.remove(this.scene.getObjectByName("latlon"));
            this.drawLatLon(this.lineMaterialDash, this.state.zoomLevel-1);
        }, 30)
        //this.drawLatLon(this.lineMaterialCont);
        //this.controls.autoRotate=true;
        //this.controls.autoRotateSpeed=0.5;
        this.timeout = setTimeout(()=>{
            //this.controls.autoRotate=false;
            if(this.state.zoomLevel === 3){
                this.camera.scale.z = 4.2;
            }
            if(this.state.zoomLevel === 2){
                this.camera.scale.z = 1.2;
            }
            this.setState({zoomLevel: this.state.zoomLevel-1});
            clearInterval(this.intervalZoom);
        }, 901);
        //this.setState({zoomLevel:1});
    }

    async componentDidMount() {
        this.props.guideShow()
        window.addEventListener("resize", this.onWindowResize);
        window.addEventListener("mouseup", this.onHideDlg);
        window.addEventListener("mousewheel", this.onPreventZoomPage, { passive: false });
        this.closeHandler = (ev) => 
        {   
            ev.preventDefault();
            //console.log("test");
            return ev.returnValue = 'Are you sure you want to close?';
        }
        this.closeEvent = (ev) => {
            ev.preventDefault();
            function sleep(delay) {
                const start = new Date().getTime();
                //console.log("unload")
                while (new Date().getTime() < start + delay);
            }
        
            // unloading won't finish until 10 full seconds pass!
            sleep(10000);
            setTimeout(() => {
                // this part would be ignored since unloading will already
                // finish by now, thus it won't wait for this async call
                sleep(10000);
            }, 0);
        }
        //window.addEventListener("beforeunload", this.closeHandler)
        //window.addEventListener("unload", this.closeEvent)
        this.setState({isLoading: true});
        /*
        await this.props.latitudeGet();
        await this.props.longitudeGet();
        this.setState({
            latLabels: this.props.latitudeState.latitudes,
            lonLabels: this.props.longitudeState.longitudes,
        })
        await this.props.wordDataGet(
            this.props.latitudeState.latitudes[0].id, 
            this.props.latitudeState.latitudes[35].id+1, 
            this.props.longitudeState.longitudes[0].id, 
            this.props.longitudeState.longitudes[71].id+1
        );
        await this.props.getWordDataByPage(1, 6, "");
        await this.props.seleclistUserStudy(1)
        this.setState({
            words: this.props.wordState.wordData,
            wordsRnd: this.props.wordState.wordDataRnd,
            wordsRndLat: this.props.wordState.wordDataRndLat,
            wordsRndLon: this.props.wordState.wordDataRndLon
        })
        */
       var i_Nth = Math.floor(Math.random() * 8 + 1);
        var i_NthLat, i_NthLon;

        this.textureSrc = IMGS.IMG_TEXTURE

        switch(i_Nth){
            case 1:
                i_NthLat = 1; i_NthLon = 1 ;
                this.textureSrc = IMGS.IMG_MAP_1;
                break;
            case 2:
                i_NthLat = 1; i_NthLon = 2;
                this.textureSrc = IMGS.IMG_MAP_2;
                break;
            case 3:
                i_NthLat = 1; i_NthLon = 3;
                break;
            case 4:
                i_NthLat = 1; i_NthLon = 4;
                break;
            case 5:
                i_NthLat = 2; i_NthLon = 1;
                this.textureSrc = IMGS.IMG_MAP_5;
                break;
            case 6:
                i_NthLat = 2; i_NthLon = 2;
                this.textureSrc = IMGS.IMG_MAP_6;
                break;
            case 7:
                i_NthLat = 2; i_NthLon = 3;
                break;
            case 8:
                i_NthLat = 2; i_NthLon = 4;
                break;
            default:
                i_NthLat = 1; i_NthLon = 1;
                break;
        }
        //console.log(i_Nth, i_NthLat, i_NthLon);
        await this.props.greWordDataGet(i_Nth);
        await this.props.greLatDataGet(i_NthLat);
        await this.props.greLonDataGet(i_NthLon);
        this.setState({
            latLabels: this.props.greState.greLatitude,
            lonLabels: this.props.greState.greLongitude,
            words: this.props.greState.greWordData,
            i_Nth: this.i_Nth
        })
        this.drawWordGlobe();
        this.setState({isLoading: false})
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.frameId);
        this.mount.removeChild(this.renderer.domElement);
        window.removeEventListener('mouseup', this.onHideDlg);
        window.removeEventListener('resize', this.onWindowResize);
        window.removeEventListener("mousewheel", this.onPreventZoomPage);

        //window.removeEventListener('beforeunload', this.closeHandler);
        //window.removeEventListener('unload', this.closeEvent);
    }

    onWindowResize = () => {
        var width = this.mount.clientWidth;
        var height = this.mount.clientHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    
        this.renderer.setSize( width, height );
    }

    onHideDlg = (event) => {
        //console.log(event.target.id);
        if(event.target.id.includes("review")) return;
        this.setState({showReviewDlg:false})
    }

    onPreventZoomPage = (event) => {
        console.log("Mouse wheeling");
        event.preventDefault();
    }
    initializeOrbits() {
        this.controls.rotateSpeed = 1.0;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
        this.controls.autoRotate=true;
        this.controls.autoRotateSpeed=0.1;
    }

    initializeCamera() {
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 1400;
        this.camera.scale.z = 1.2;
    }

    initializeLight(){
        this.scene.add( new THREE.AmbientLight( 0xeeeeee ) );

        this.light1 = new THREE.SpotLight( 0x222222, 1.0 );
        this.light1.position.x = 730; 
        this.light1.position.y = 520;
        this.light1.position.z = 626;
        this.light1.castShadow = true;
        this.scene.add( this.light1 );
    
        this.light2 = new THREE.PointLight( 0x222222, 1.0 );
        this.light2.position.x = -640;
        this.light2.position.y = -500;
        this.light2.position.z = -1000;
        this.scene.add( this.light2 );
    }

    animate() {
        this.frameId = window.requestAnimationFrame(this.animate);
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    screenXY(vec3){
        var vector = vec3.clone();
        vector.project(this.camera);
        
        var result = {};
        var width = this.mount.clientWidth;
        var height = this.mount.clientHeight;
        var windowWidth = width;
        var minWidth = 1280;
        
        if(windowWidth < minWidth) {
            windowWidth = minWidth;
        }
    
        result.x = Math.round(vector.x * windowWidth / 2) + windowWidth / 2;
        result.y = Math.round((0 - vector.y) * (height / 2)) + height / 2;
        
        return result;
    }
    
    onMouseEnterItem = () => {
        this.setState({hoverButton: true});
    }

    onMouseLeaveItem = () => {
        this.setState({hoverButton: false});
    }

    onClickKnown = async () => {
        await this.props.saveUserStudy(this.state.selectedWord.id, 1, 1, 6, "");
        this.setState({showReviewDlg:false})
    }

    onClickUnKnown = async () => {
        await this.props.saveUserStudy(this.state.selectedWord.id, 2, 1, 6, "");
        this.setState({showReviewDlg:false, showDetailDlg:true})
    }

    render() {
        let {wordState, logout} = this.props
        let {guideShow} = this.props.guideState
        let {totalRowCount} = this.props.reviewState
        let {data} = this.props.userStudy
        if(wordState.getState === -2){
            logout();
        }
        return (
        <div>
            <Header color="#206ea7" auth={true} history={this.props.history}/>
            {guideShow && 
                    <div className="guide-container">
                    <Carousel
                        withoutControls={false}
                        transitionMode={"scroll3d"}
                        horizontal
                        cellAlign={"center"}
                        
                        slidesToShow={1}
                        slidesToScroll={"auto"}
                        wrapAround={false}
                        slideIndex={0}
                        heightMode={"max"}
                        animation={"zoom"}
                        zoomScale={0.85}
                        swiping
                        renderBottomCenterControls={({currentSlide}) => {
                            return (
                                <div
                                    style={{
                                        fontSize:22,
                                        fontWeight:"bold",
                                        fontFamily: "Helvetica",
                                        color: "#fff",
                                        textAlign:"center",
                                        paddingBottom:50
                                    }}
                                >
                                    {this.state.guideDesc[currentSlide]}
                                </div>
                            )}
                        }
                    >
                        {this.state.guideImgs.map((gImg, index) => (
                            <div style={{display:"flex", alignItems:"center", justifyContent:"center", height:"100vh"}} key={"guide-brainstorm-"+index}>
                                <img src={gImg} style={{width:"80%", height:"auto"}} alt="None"/>
                            </div>
                        ))}
                    </Carousel>
                    <div className="skip-button" onClick={() => {this.props.guideHide()}}> Skip </div>
                </div>
                }
            <div
                style={{ width: "100vw", height: "100vh", backgroundColor:"#ffffff"}}
                ref={mount => {
                    this.mount = mount;
                }}
            />
            {this.state.isLoading &&
                <img src={IMGS.IMG_LOADING} style={{width:32, height:32, marginTop:5, position:"absolute", left: "50%", top:"50%"}} alt="Null" />
            }
            {!this.state.isLoading&&
            this.state.words.map((word, index) => {
                var matrix = this.objects.matrixWorld;
                var lat, lon, lon1; //, lat1;
                var cntLon;//, cntLat;
                //cntLat = this.state.latLabels.length;
                cntLon = this.state.lonLabels.length;

                if(this.state.zoomLevel === 2){
                    lon = Math.PI * Math.floor((word.location.lon-1)/2 - cntLon/4) / (cntLon/4);
                    lon1 = Math.PI * Math.floor((word.location.lon-1)/2 - cntLon/4+1) / (cntLon/4);
                    lat = (Math.PI / 2) * Math.floor((word.location.lat-1+6)/2 - this.state.staticLatCnt/4) / (this.state.staticLatCnt/4); // + (Math.PI / 18) * word.location.delta;    
                }else if(this.state.zoomLevel === 3){
                    lon = Math.PI * Math.floor((word.location.lon-1) - cntLon/2) / (cntLon/2);
                    lon1 = Math.PI * Math.floor((word.location.lon-1) - cntLon/2+1) / (cntLon/2);
                    lat = (Math.PI / 2) * Math.floor((word.location.lat-1+6) - this.state.staticLatCnt/2) / (this.state.staticLatCnt/2);// + (Math.PI / 36) * word.location.delta;    
                }else if(this.state.zoomLevel === 1){
                    lon = Math.PI * Math.floor((word.location.lon-1) - (cntLon/2)) / (cntLon/2);
                    lon1 = Math.PI * Math.floor((word.location.lon-1) - (cntLon/2)) / (cntLon/2);
                    lat = (Math.PI / 2) * Math.floor((word.location.lat-1+6) - (this.state.staticLatCnt/2)) / (this.state.staticLatCnt/2); // + (Math.PI / 18) * word.location.delta;
                }    
            
                var rad = 100;
                
                var phi = lat + Math.PI / 2;
                var theta = -lon;
                var theta1 = -lon1
                
                var center = new THREE.Vector3();                
                center.x = Math.sin(phi) * Math.cos(theta) * rad;
                center.y = Math.cos(phi) * rad;
                center.z = Math.sin(phi) * Math.sin(theta) * rad;

                var center1 = new THREE.Vector3();                
                center1.x = Math.sin(phi) * Math.cos(theta1) * rad;
                center1.y = Math.cos(phi) * rad;
                center1.z = Math.sin(phi) * Math.sin(theta1) * rad;

                var abspos = center.applyMatrix4(matrix);
                var abspos1 = center1.applyMatrix4(matrix);

                var screenPos = this.screenXY(abspos);
                var screenPos1 = this.screenXY(abspos1);

                var distance = this.camera.position.distanceTo(abspos);
                var length = this.camera.position.length()-40;

                var str = word.config.prefix + word.config.root + word.config.suffix + word.config.tale;
                var len = str.length;

                var wid = Math.floor(Math.abs(screenPos.x-screenPos1.x));
                var rate = wid/len;
                var fontSize = rate * 1.5;
                if(fontSize < 12){
                    fontSize = 12;
                }
                if(fontSize > 25){
                    fontSize = 25;
                }
                if(this.state.zoomLevel === 1){
                    fontSize = 20;
                }
                if(distance < length && parseInt(word.level) <= this.state.zoomLevel) {
                    if(this.state.zoomLevel === 2 && word.level === 1){
                        return null;
                    }
                    if(this.state.selectedWordIndex === index){
                        return(
                        <button id={"word-"+index} key={"word-"+index} 
                            style={{backgroundColor:"#00000000", border:"none", position:"absolute", top:screenPos.y, left: screenPos.x, cursor: this.state.hoverWord?'hand':'pointer', fontFamily:"Helvetica", fontWeight:"bold", fontSize: fontSize}} 
                            onClick={(e) => {/*console.log(word);*/ this.setState({selectedWord:word, showReviewDlg:true})}}
                            onMouseEnter={(e) => {this.setState({hoverWord: true})}}
                            onMouseLeave={(e) => {this.setState({hoverWord: false})}}
                        >
                            <img src={IMGS.IMG_LANDMARK} style={{width:30, height:25, position:"absolute", top: -5, left: -20}} alt="NONE"></img>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.prefix}</span>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.root}</span>
                            <span style={{color:COLORS.COLOR_SUFFIX}}>{word.config.suffix}</span>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.tale}</span>
                        </button>
                        )  
                    }
                    return(
                        <button id={"word-"+index} key={"word-"+index} 
                            style={{background:"#00000000", border:"none", position:"absolute", top:screenPos.y, left: screenPos.x, cursor: this.state.hoverWord?'hand':'pointer', fontFamily:"Helvetica", fontWeight:"bold", fontSize: fontSize}} 
                            onClick={(e) => {/*console.log(word); */ this.setState({selectedWord:word, showReviewDlg:true, selectedWordIndex: index})}}
                            onMouseEnter={(e) => {this.setState({hoverWord: true})}}
                            onMouseLeave={(e) => {this.setState({hoverWord: false})}}
                        >
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.prefix}</span>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.root}</span>
                            <span style={{color:COLORS.COLOR_SUFFIX}}>{word.config.suffix}</span>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.tale}</span>
                        </button>
                    )
                }else{
                    return null;
                }
            })
            }
            {/* {!this.state.isLoading&&
            this.state.wordsRnd.map((word, index) =>{
                var matrix = this.objects.matrixWorld;
                var lat, lon
                lon = 2*Math.PI * word.location.lon;
                lat = (Math.PI) * word.location.lat;
                var rad = 100;

                var phi = lat;
                var theta = -lon;
                
                var center = new THREE.Vector3();
                center.x = Math.sin(phi) * Math.cos(theta) * rad;
                center.y = Math.cos(phi) * rad;
                center.z = Math.sin(phi) * Math.sin(theta) * rad;

                var abspos = center.applyMatrix4(matrix);
                var screenPos = this.screenXY(abspos);
                var distance = this.camera.position.distanceTo(abspos);
                var length = this.camera.position.length()-40;

                if(distance < length && parseInt(word.level) <= this.state.zoomLevel) {
                    if(this.state.selectedWordIndex === index){
                        return(
                        <button id={"word-rnd-"+index} key={"word-"+index} 
                            style={{background:"#00000000", border:"none", position:"absolute", top:screenPos.y, left: screenPos.x, cursor: this.state.hoverWord?'hand':'pointer', fontFamily:"Helvetica", fontWeight:"bold", fontSize:30}} 
                            onClick={(e) => {console.log(word); this.setState({selectedWord:word, showReviewDlg:true})}}
                            onMouseEnter={(e) => {this.setState({hoverWord: true})}}
                            onMouseLeave={(e) => {this.setState({hoverWord: false})}}
                        >
                            <img src={IMGS.IMG_LANDMARK} style={{width:30, height:25, position:"absolute", top: -5, left: -20}} alt="NONE"></img>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.prefix}</span>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.root}</span>
                            <span style={{color:COLORS.COLOR_SUFFIX}}>{word.config.suffix}</span>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.tale}</span>
                        </button>
                        )  
                    }
                    return(
                        <button id={"word-rnd"+index} key={"word-"+index} 
                        style={{background:"#00000000", border:"none", position:"absolute", top:screenPos.y, left: screenPos.x, cursor: this.state.hoverWord?'hand':'pointer', fontFamily:"Helvetica", fontWeight:"bold", fontSize:30}} 
                        onClick={(e) => {console.log(word); this.setState({selectedWord:word, showReviewDlg:true, selectedWordIndex: index})}}
                        onMouseEnter={(e) => {this.setState({hoverWord: true})}}
                        onMouseLeave={(e) => {this.setState({hoverWord: false})}}
                        >
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.prefix}</span>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.root}</span>
                            <span style={{color:COLORS.COLOR_SUFFIX}}>{word.config.suffix}</span>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.tale}</span>
                        </button>
                    )
                }else{
                    return(
                        <div key={"word-rnd"+index}></div>
                    );
                }
            })
            } */}
            {/* {!this.state.isLoading&&
            this.state.wordsRndLat.map((word, index) => {
                var matrix = this.objects.matrixWorld;
                var lat, lon
                if(this.state.zoomLevel === 2){
                    lon = 2 * Math.PI * word.location.lon/2;
                    lat = (Math.PI / 2) * (word.location.lat/2 - 9) / 9 + (Math.PI / 18) * word.location.delta;
                }else if(this.state.zoomLevel === 3){
                    lon = 2 * Math.PI * word.location.lon/2;
                    lat = (Math.PI / 2) * (word.location.lat - 18) / 18 + (Math.PI / 36) * word.location.delta;
                }else if(this.state.zoomLevel === 1){
                    lon = 2 * Math.PI * word.location.lon/2;
                    lat = (Math.PI / 2) * (word.location.lat - 9) / 9 + (Math.PI / 18) * word.location.delta;
                }
                var rad = 100;
                
                var phi = lat + Math.PI / 2;
                var theta = -lon;
                
                var center = new THREE.Vector3();                
                center.x = Math.sin(phi) * Math.cos(theta) * rad;
                center.y = Math.cos(phi) * rad;
                center.z = Math.sin(phi) * Math.sin(theta) * rad;

                var abspos = center.applyMatrix4(matrix);
                var screenPos = this.screenXY(abspos);
                var distance = this.camera.position.distanceTo(abspos);
                var length = this.camera.position.length()-40;

                if(distance < length && parseInt(word.level) <= this.state.zoomLevel) {
                    if(this.state.selectedWordIndex === index){
                        return(
                        <button id={"word-rnd-lat"+index} key={"word-"+index} 
                            style={{background:"#00000000", border:"none", position:"absolute", top:screenPos.y, left: screenPos.x, cursor: this.state.hoverWord?'hand':'pointer', fontFamily:"Helvetica", fontWeight:"bold", fontSize:30}} 
                            onClick={(e) => {console.log(word); this.setState({selectedWord:word, showReviewDlg:true})}}
                            onMouseEnter={(e) => {this.setState({hoverWord: true})}}
                            onMouseLeave={(e) => {this.setState({hoverWord: false})}}
                        >
                            <img src={IMGS.IMG_LANDMARK} style={{width:30, height:25, position:"absolute", top: -5, left: -20}} alt="NONE"></img>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.prefix}</span>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.root}</span>
                            <span style={{color:COLORS.COLOR_SUFFIX}}>{word.config.suffix}</span>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.tale}</span>
                        </button>
                        )  
                    }
                    return(
                        <button id={"word-rnd-lat"+index} key={"word-"+index} 
                            style={{background:"#00000000", border:"none", position:"absolute", top:screenPos.y, left: screenPos.x, cursor: this.state.hoverWord?'hand':'pointer', fontFamily:"Helvetica", fontWeight:"bold", fontSize:30}} 
                            onClick={(e) => {console.log(word); this.setState({selectedWord:word, showReviewDlg:true, selectedWordIndex: index})}}
                            onMouseEnter={(e) => {this.setState({hoverWord: true})}}
                            onMouseLeave={(e) => {this.setState({hoverWord: false})}}
                        >
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.prefix}</span>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.root}</span>
                            <span style={{color:COLORS.COLOR_SUFFIX}}>{word.config.suffix}</span>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.tale}</span>
                        </button>
                    )
                }else{
                    return(
                        <div key={"word-rnd-lat"+index}></div>
                    );
                }
            })
            } */}
            {/* {!this.state.isLoading&&
            this.state.wordsRndLon.map((word, index) => {
                var matrix = this.objects.matrixWorld;
                var lat, lon
                if(this.state.zoomLevel === 2){
                    lon = Math.PI * (word.location.lon/2 - 18) / 18 +  (Math.PI / 18) * word.location.delta;
                    lat = (Math.PI / 2) * word.location.lat;
                }else if(this.state.zoomLevel === 3){
                    lon = Math.PI * (word.location.lon - 36) / 36 + (Math.PI / 36) * word.location.delta;
                    lat = (Math.PI / 2) * word.location.lat;
                }else if(this.state.zoomLevel === 1){
                    lon = Math.PI * (word.location.lon - 18) / 18 + (Math.PI / 18) * word.location.delta;
                    lat = (Math.PI / 2) * word.location.lat;
                }
                var rad = 100;
                
                var phi = lat + Math.PI / 2;
                var theta = -lon;
                
                var center = new THREE.Vector3();                
                center.x = Math.sin(phi) * Math.cos(theta) * rad;
                center.y = Math.cos(phi) * rad;
                center.z = Math.sin(phi) * Math.sin(theta) * rad;

                var abspos = center.applyMatrix4(matrix);
                var screenPos = this.screenXY(abspos);
                var distance = this.camera.position.distanceTo(abspos);
                var length = this.camera.position.length()-40;

                if(distance < length && parseInt(word.level) <= this.state.zoomLevel) {
                    if(this.state.selectedWordIndex === index){
                        return(
                        <button id={"word-rnd-lon-"+index} key={"word-"+index} 
                            style={{background:"#00000000", border:"none", position:"absolute", top:screenPos.y, left: screenPos.x, cursor: this.state.hoverWord?'hand':'pointer', fontFamily:"Helvetica", fontWeight:"bold", fontSize:30}} 
                               onClick={(e) => {console.log(word); this.setState({selectedWord:word, showReviewDlg:true})}}
                            onMouseEnter={(e) => {this.setState({hoverWord: true})}}
                            onMouseLeave={(e) => {this.setState({hoverWord: false})}}
                        >
                            <img src={IMGS.IMG_LANDMARK} style={{width:30, height:25, position:"absolute", top: -5, left: -20}} alt="NONE"></img>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.prefix}</span>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.root}</span>
                            <span style={{color:COLORS.COLOR_SUFFIX}}>{word.config.suffix}</span>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.tale}</span>
                        </button>
                        )  
                    }
                    return(
                        <button id={"word-rnd-lon-"+index} key={"word-"+index} 
                            style={{background:"#00000000", border:"none", position:"absolute", top:screenPos.y, left: screenPos.x, cursor: this.state.hoverWord?'hand':'pointer', fontFamily:"Helvetica", fontWeight:"bold", fontSize:30}} 
                            onClick={(e) => {console.log(word); this.setState({selectedWord:word, showReviewDlg:true, selectedWordIndex: index})}}
                            onMouseEnter={(e) => {this.setState({hoverWord: true})}}
                            onMouseLeave={(e) => {this.setState({hoverWord: false})}}
                        >
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.prefix}</span>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.root}</span>
                            <span style={{color:COLORS.COLOR_SUFFIX}}>{word.config.suffix}</span>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.tale}</span>
                        </button>
                    )
                }else{
                    return(
                        <div key={"word-rnd-lon-"+index}></div>
                    );
                }
            })
            } */}
            {!this.state.isLoading &&  
            this.state.latLabels.map((value, index) => {
                var lat;
                //var cntLat = this.state.latLabels.length;
                // if(this.state.zoomLevel === 2){
                //     if(index % 2 === 0) return <div key={"lat-empty-"+index}></div>
                //     lat = (Math.PI / 2) * (Math.floor(index/2) - (cntLat/4)) / (cntLat/4);
                // }else if(this.state.zoomLevel === 3){
                //     lat = (Math.PI / 2) * (index - (cntLat/2)) / (cntLat/2);
                // }
                if(this.state.zoomLevel === 2){
                    if((index) % 2 === 0) return <div key={"lat-empty-"+(index+6)}></div>
                    lat = (Math.PI / 2) * (Math.floor((index+6)/2) - (this.state.staticLatCnt/4)) / (this.state.staticLatCnt/4);
                }else if(this.state.zoomLevel === 3){
                    lat = (Math.PI / 2) * ((index+6) - (this.state.staticLatCnt/2)) / (this.state.staticLatCnt/2);
                }
                var matrix = this.objects.matrixWorld;
                var rad = 100;
                var spherical = new THREE.Spherical(rad, 0, 0);
                spherical.setFromVector3(this.camera.position);
                var phi = lat + Math.PI / 2;
                var theta = -spherical.theta+Math.PI/2;
                
                var center = new THREE.Vector3();                
                center.x = Math.sin(phi) * Math.cos(theta) * rad;
                center.y = Math.cos(phi) * rad;
                center.z = Math.sin(phi) * Math.sin(theta) * rad;

                var abspos = center.applyMatrix4(matrix);
                var screenPos = this.screenXY(abspos);
                var distance = this.camera.position.distanceTo(abspos);
                var length = this.camera.position.length();

                if(distance < length && this.camera.scale.z > 3) {
                    return(
                        <button id={"lat-"+index} key={"lat-"+index} style={{ background:"#00000000", border:"none", position:"absolute", top:screenPos.y, left: screenPos.x, display:'flex', flexDirection:'column', transform:"translate(0px, -50%)"}}>
                            <span style={{fontFamily:"Helvetica", fontWeight:"bold", color:COLORS.COLOR_ROOT, fontSize: 10}}>{value.affix}</span>
                            <span style={{fontFamily:"Helvetica", fontWeight:"bold", color:COLORS.COLOR_ROOT, fontSize: 10}}>{value.meaning}</span>
                        </button>
                    )
                }else{
                    return null;
                }
            })
            }
            {!this.state.isLoading && 
            this.state.lonLabels.map((value, index) => {
                if(value.LongitudeId === 0) return null;
                var matrix = this.objects.matrixWorld;
                var lon, lon1, theta1, center1, abspos1, screenPos1;
                var cntLon = this.state.lonLabels.length;
                if(this.state.zoomLevel === 2){
                    if(index % 2 === 0) return <div key={"lon-empty-"+index}></div>
                    lon = Math.PI * Math.floor(index/2) / (cntLon/4);
                    lon1 = Math.PI * Math.floor((index)/2 + 1) / (cntLon/4);
                }else if(this.state.zoomLevel === 3){
                    lon = Math.PI * (index) / (cntLon/2);
                    lon1 = Math.PI * Math.floor(index + 1)/ (cntLon/2);
                }
                //var lon = Math.PI * (index) / 18;
                var rad = 100;
                var spherical = new THREE.Spherical(rad, 0, 0);
                spherical.setFromVector3(this.camera.position);
                //console.log(this.controls.getPolarAngle());
                var phi = -spherical.phi;
                //console.log(phi)
                var theta = -lon;
                theta1 = -lon1;

                var center = new THREE.Vector3();
                center.x = Math.sin(phi) * Math.cos(theta) * rad;
                center.y = Math.cos(phi) * rad;
                center.z = Math.sin(phi) * Math.sin(theta) * rad;

                center1 = new THREE.Vector3();                
                center1.x = Math.sin(phi) * Math.cos(theta1) * rad;
                center1.y = Math.cos(phi) * rad;
                center1.z = Math.sin(phi) * Math.sin(theta1) * rad;

                var abspos = center.applyMatrix4(matrix);
                abspos1 = center1.applyMatrix4(matrix);

                var screenPos = this.screenXY(abspos);
                screenPos1 = this.screenXY(abspos1);

                var distance = this.camera.position.distanceTo(abspos);
                var length = this.camera.position.length();

                var str = value.Label;
                var len = str.length;

                var wid = Math.floor(Math.abs(screenPos.x-screenPos1.x));
                if(len === 0){
                    len = 0.01;
                } 
                var rate = wid/len;
                var fontSize = rate * 1.8;
                if(fontSize < 5){
                    fontSize = 5;
                }
                if(fontSize > 10){
                    fontSize = 10;
                }

                if(distance < length && this.camera.scale.z > 3) {
                    return(
                        <button id={"lon-"+index} key={"lon-"+index} style={{ background:"#00000000", border:"none", position:"absolute", top:screenPos.y, left: screenPos.x, display:'flex', flexDirection:'row', transform:"translate(0px, -50%)"}}>
                            <span style={{fontFamily:"Helvetica", fontWeight:"bold", color:COLORS.COLOR_ROOT, fontSize: fontSize}}>{value.Label}</span>
                            {/* <span style={{fontFamily:"Helvetica", fontWeight:"bold", color:COLORS.COLOR_ROOT, fontSize: 10}}>={value.meaning}</span> */}
                        </button>
                    )
                }else{
                    return null;
                }
            })
            }
            {!this.state.isLoading &&
                <div className="progress-text">
                    <div className="gre">GRE</div>
                    <div className="smallgre">Your Progress</div>
                    <div className="progress">
                        <div className="bar" style={{
                            backgroundColor: "#dee0e5", 
                            borderRadius: 10, 
                            width: data != null ? ""+Math.floor(data.length/totalRowCount*100)+"%": "0%", 
                            height: 17, display: "flex", 
                            justifyContent: "center", 
                            alignItems: "center"}}
                        >
                            <span style={{color: "#2062a7", fontSize: 15, fontFamily:"Helvetica", marginLeft:30}}>{data != null ? ""+Math.floor(data.length/totalRowCount*100)+"%": "0%"}</span>
                        </div>
                    </div>
                </div>
            }

            <div>
                <button type="button" onClick={()=>this.zoomIn()} style={{width: 61, height: 59, backgroundColor: "#f4f4f4", outline:"none", border:"none", borderRadius: 10, position: "absolute", right: 70, top: "50%", marginTop: -80, zIndex: 1003, cursor: this.state.hoverButton?'hand':'pointer'}}
                    onMouseEnter={this.onMouseEnterItem}
                    onMouseLeave={this.onMouseLeaveItem}
                >
                    <img src={IMGS.IMG_ZOOMIN} style={{width: 37, height: 37}} alt="Null"/>
                </button>
                <button type="button" onClick={() => this.zoomOut()} style={{width: 61, height: 59, backgroundColor: "#f4f4f4", outline:"none", border:"none", borderRadius: 10, position: "absolute", right: 70, top: "50%", marginBottom: -10, zIndex: 1003, cursor: this.state.hoverButton?'hand':'pointer'}}
                    onMouseEnter={this.onMouseEnterItem}
                    onMouseLeave={this.onMouseLeaveItem}
                >
                    <img src={IMGS.IMG_ZOOMOUT} style={{width: 37, height: 2, paddingBottom:3}} alt="Null"/>
                </button>
            </div>
            {
            this.state.showDetailDlg &&
                <DetailDlg 
                    word={this.state.selectedWord}
                    onClickBack={() => this.setState({showDetailDlg:false})}
                    onMouseEnterItem={this.onMouseEnterItem}
                    onMouseLeaveItem={this.onMouseLeaveItem}
                    hoverButton={this.state.hoverButton}
                />
            }
            {
            this.state.showReviewDlg &&
                <ReviewDlg 
                    word={this.state.selectedWord} 
                    onClickKnown={this.onClickKnown}
                    onOpenDetailDlg={this.onClickUnKnown}
                    onMouseEnterItem={this.onMouseEnterItem}
                    onMouseLeaveItem={this.onMouseLeaveItem}
                    hoverButton={this.state.hoverButton}
                />
            }
        </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WordGlob); 
