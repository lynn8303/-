/**
 * [onFormReady 流程入口函数]
 * @param  {[type]} oForm [流程表单对象, 引擎注入]
 * @return {[type]}       [description]
 */
var onFormReady = function(oForm) {
    this.oForm = oForm;
    this.formContext = oForm;
    submitInfoUtil.init('APPLICANT','APPLY_DEPARTMENT','APPLICANT_MOBILE');//页面头部申请人信息编辑框
    getProc(oForm); //处理过程
    
    //判断出差类型是不是“培训”，是则显示“培训申请div”
	var buzType=oForm.TABLE.CUST_JTITSM_BIZ_APP.BIZ_TYPE.DEFAULT_VALUE;
	if(buzType==3){
		$("#training_application_div").css("display","block");
	}
	//初始化单选按钮
	viewMaker.init();
	//判断日期选择框，是否可选
	selectTimeList();
	
	//用户确认环节，是否追加说明，默认选择“否”
	var add_instrct=oForm.TABLE.CUST_JTITSM_BIZ_APP.ADDITIONAL_INSTRCT.DEFAULT_VALUE;
	var user_confir=oForm.TABLE.CUST_JTITSM_BIZ_APP.USER_CONFIRMATION.DEFAULT_VALUE;
	if(add_instrct==""){
		$("input[name='ADDITIONAL_INSTRCT'][value='2']").attr("checked",true);
	}
	
	var instrct_input=$("#ADIT_INSTRCT_INPUT").val();
	//当再次走到 用户确认环节 的时候，且已填写添加说明，是否追加说明按钮不可选
	if(user_confir==2 && !(instrct_input=="")){
		$("#ADDITIONAL_INSTRCT").attr("disabled","true");
	}
	
	//用户确认环节，看是否显示隐藏的追加说明输入框
	checkRadioValue();
	
	//当有追加说明的情况下，在表单显示追加说明的内容；被退回拟稿时，用户可以在表单修改追加内容,其他环节为只读。
	var instrct_input = oForm.TABLE.CUST_JTITSM_BIZ_APP.ADIT_INSTRCT_INPUT.DEFAULT_VALUE;
	if(!instrct_input==""){
		$("#ADIT_INSTRCT").val(instrct_input);
		$("#add_instrct_div").css('display',"block");
	}
	if(oForm.FLOW.TCH_NUM=="BUSINESS_APPLICATION_03"){
		$("#ADIT_INSTRCT").removeAttr("readonly");
	}else{
		$("#ADIT_INSTRCT").attr("readonly","readonly");
	}
	
};

//提交前，判断的方法
function onClickBefore(){
	//提交前判断，是否有培训申请，没有的话，将输入框清空
	if(!($("#BIZ_TYPE_SPAN_3").attr('class')=="overSelLabCss2")){
		$("#TRN_BEGIN_TIME").val("");
		$("#TRN_END_TIME").val("");
		$("#TRN_PLACE").val("");
		$("#TRN_COST").val("");
		$("#TRN_PERSON").val("");
		$("#TRAVEL_CONTENT").val("");
	}
	
	//如果页面的 追加说明有修改，则更新
	var instrct_input = oForm.TABLE.CUST_JTITSM_BIZ_APP.ADIT_INSTRCT_INPUT.DEFAULT_VALUE;
	var add_instrct = $("#ADIT_INSTRCT").val();
	if(!(add_instrct==instrct_input)){
		$("#ADIT_INSTRCT_INPUT").val(add_instrct);
	}
	
	if($("#BIZ_TYPE_SPAN_3").attr('class')=="overSelLabCss2" && checkBizTypeDiv()==false){
		return false;
	}else if(checkTriTime()==false){
		return false;
	}else{
		return true;
	}
}

//判断页面时间的关系
function checkTriTime(){
	var beginTime = $("#BIZ_BEGIN_TIME").val();		//出差开始时间
	var endTime = $("#BIZ_END_TIME").val();			//出差结束时间
	var triBeginTime = $("#TRN_BEGIN_TIME").val();	//培训开始时间
	var triEndTime = $("#TRN_END_TIME").val();		//培训结束时间
	
	var d1=new Date(beginTime.replace(/\-/g,'/'));
 	var d2=new Date(endTime.replace(/\-/g,'/'));
	var d3=new Date(triBeginTime.replace(/\-/g,'/'));
 	var d4=new Date(triEndTime.replace(/\-/g,'/'));
 	if(d1>d2){
 		MMsg("出差开始时间不能大于出差结束时间！");
 		return false;
 	}else if(d3>d4){
 		MMsg("培训开始时间不能大于培训结束时间！");
 		return false;
 	}
}

//判断日期选择框，是否可选
function selectTimeList(){
	if(oForm.TABLE.CUST_JTITSM_BIZ_APP.BIZ_BEGIN_TIME.IS_READONLY=='T'){
		getObj('BIZ_BEGIN_TIME').disabled='disabled';
        $("#BIZ_BEGIN_TIME").attr("style","background-color:#ffffff");
    }
    if(oForm.TABLE.CUST_JTITSM_BIZ_APP.BIZ_END_TIME.IS_READONLY=='T'){
		getObj('BIZ_END_TIME').disabled='disabled';
        $("#BIZ_END_TIME").attr("style","background-color:#ffffff");
    }
    if(oForm.TABLE.CUST_JTITSM_BIZ_APP.TRN_BEGIN_TIME.IS_READONLY=='T'){
		getObj('TRN_BEGIN_TIME').disabled='disabled';
        $("#TRN_BEGIN_TIME").attr("style","background-color:#ffffff");
    }
    if(oForm.TABLE.CUST_JTITSM_BIZ_APP.TRN_END_TIME.IS_READONLY=='T'){
		getObj('TRN_END_TIME').disabled='disabled';
        $("#TRN_END_TIME").attr("style","background-color:#ffffff");
    }
}

//初始化页面的单选按钮
viewMaker={
	init:function(){
		this.bizTypeInit();
		this.transitVehicleInit();
		this.goBookingInit();
		this.returnTrafficInit();
		this.returnBookingInit();
		this.reservationModeInit();
	},
	
    //出差类型
    bizTypeInit:function(){
    	createLabelListNew("BIZ_TYPE_SPAN", "BIZ_TYPE", FlowUtil
                    .getTableFieldProperty("BIZ_TYPE", "DEFAULT_VALUE"), null,
                    null, null, null, 'oper.onBizTypeChange()',
                    'oper.onBizTypeChangeCfg()');
    },
    //去程交通工具
    transitVehicleInit:function(){
    	createLabelListNew("TRANSIT_VEHICLE_SPAN", "TRANSIT_VEHICLE", FlowUtil
                    .getTableFieldProperty("TRANSIT_VEHICLE", "DEFAULT_VALUE"), null,
                    null, null, null, 'oper.transitVehicleInit()',
                    'oper.onTransitVehicleCfg()');
    },
    //去程订票方式
    goBookingInit:function(){
    	createLabelListNew("GO_BOOKING_SPAN", "GO_BOOKING", FlowUtil
                    .getTableFieldProperty("GO_BOOKING", "DEFAULT_VALUE"), null,
                    null, null, null, 'oper.goBookingInit()',
                    'oper.onGoBookingCfg()');
    },
    //返程交通工具
    returnTrafficInit:function(){
    	createLabelListNew("RETURN_TRAFFIC_SPAN", "RETURN_TRAFFIC", FlowUtil
                    .getTableFieldProperty("RETURN_TRAFFIC", "DEFAULT_VALUE"), null,
                    null, null, null, 'oper.returnTrafficInit()',
                    'oper.returnTrafficCfg()');
    },
    //返程订票方式
    returnBookingInit:function(){
    	createLabelListNew("RETURN_BOOKING_SPAN", "RETURN_BOOKING", FlowUtil
                    .getTableFieldProperty("RETURN_BOOKING", "DEFAULT_VALUE"), null,
                    null, null, null, 'oper.returnBookingInit()',
                    'oper.returnBookingCfg()');
    },
    //订房方式
    reservationModeInit:function(){
    	createLabelListNew("RESERVATION_MODE_SPAN", "RESERVATION_MODE", FlowUtil
                    .getTableFieldProperty("RESERVATION_MODE", "DEFAULT_VALUE"), null,
                    null, null, null, 'oper.reservationModeInit()',
                    'oper.reservationModeCfg()');
    }
};

var oper={
    //出差类型
	onBizTypeChange:function(){
	 	setRadioValue('BIZ_TYPE',ElementUtil.get('BIZ_TYPE_SPAN').value || '');  
	 	checkBizType();
	},
	onBizTypeChangeCfg:function(){
	     if(getObj('BIZ_TYPE').disabled){
	         return false;
	     }
	     return true;
    },
	//去程交通工具
	transitVehicleInit:function(){
		setRadioValue('TRANSIT_VEHICLE',ElementUtil.get('TRANSIT_VEHICLE_SPAN').value || ''); 
	},
	onTransitVehicleCfg:function(){
	     if(getObj('TRANSIT_VEHICLE').disabled){
	         return false;
	     }
	     return true;
    },
	//去程订票方式
	goBookingInit:function(){
		setRadioValue('GO_BOOKING',ElementUtil.get('GO_BOOKING_SPAN').value || ''); 
	},
	onGoBookingCfg:function(){
	     if(getObj('GO_BOOKING').disabled){
	         return false;
	     }
	     return true;
    },
    //返程交通工具
	returnTrafficInit:function(){
		setRadioValue('RETURN_TRAFFIC',ElementUtil.get('RETURN_TRAFFIC_SPAN').value || ''); 
	},
	returnTrafficCfg:function(){
	     if(getObj('RETURN_TRAFFIC').disabled){
	         return false;
	     }
	     return true;
    },
    //返程订票方式
	returnBookingInit:function(){
		setRadioValue('RETURN_BOOKING',ElementUtil.get('RETURN_BOOKING_SPAN').value || ''); 
	},
	returnBookingCfg:function(){
	     if(getObj('RETURN_BOOKING').disabled){
	         return false;
	     }
	     return true;
    },
    //订房方式
	reservationModeInit:function(){
		setRadioValue('RESERVATION_MODE',ElementUtil.get('RESERVATION_MODE_SPAN').value || ''); 
	},
	reservationModeCfg:function(){
	     if(getObj('RESERVATION_MODE').disabled){
	         return false;
	     }
	     return true;
    },
	onChangeCfg: function() {
    	return true;
    }
};

//出差类型的改变事件
//当出差类型为“培训”时，显示隐藏的"培训申请div"
function checkBizType(){
	if($("#BIZ_TYPE_SPAN_3").attr('class')=="overSelLabCss2"){
		$("#training_application_div").css("display","block");
	}else{
		$("#training_application_div").css("display","none");
	}
}

//当隐藏的"培训申请div"显示后，对必填项，进行判断
function checkBizTypeDiv(){
	if($("#TRN_BEGIN_TIME").val()==""){
		EMsg("培训开始时间不允许为空！");
		return false;
	}else if($("#TRN_END_TIME").val()==""){
		EMsg("培训结束时间不允许为空！");
		return false;
	}else if($("#TRN_PLACE").val()==""){
		EMsg("培训地点不允许为空！");
		return false;
	}else if($("#TRN_COST").val()==""){
		EMsg("培训费用不允许为空！");
		return false;
	}else if($("#TRN_PERSON").val()==""){
		EMsg("培训人员不允许为空！");
		return false;
	}else if($("#TRAVEL_CONTENT").val()==""){
		EMsg("培训内容不允许为空！");
		return false;
	}else{
		return true;
	}
}

//导出pdf文件
var downLoadReady="";
function exportPdf(){
	parent.document.frames("fraToolBar").toOutPdf(false);
	downLoadReady=1;
}

//用户确认环节，环节创建后执行的判断函数（数据库配置）
function checkFormReq(nextTchNum,action){
	var currTchNum = oForm.FLOW.TCH_NUM;//当前环节
	var nextTchNum = nextTchNum;//下一环节
	
	//判断是否第二次走到用户确认环节
	var user_confirmation=$("#USER_CONFIRMATION").val();
	var tempValue=$('input:radio[name="ADDITIONAL_INSTRCT"]:checked').val();
	//当用户选中“是”时，显示“追加说明”的文本框
	if(tempValue==1){
		$("#ADIT_INSTRCT_DIV").css('display',"block");
	}else{
		$("#ADIT_INSTRCT_DIV").css('display',"none");
	}
	
	//当用户选中添加“追加说明”的时候，判断追加说明框是否有填写值
	var adit_instrct=$("#ADIT_INSTRCT_INPUT").val();
	if( tempValue==1 && adit_instrct==""){
		MMsg("增加说明输入框不允许为空！");
		return false;
	}
		
	//当用户选中"追加说明"的时候，下一环节路径只能是前进到室主任审核。(除非流程再次回到“用户确认”环节)
	if( tempValue==1 && nextTchNum=='BUSINESS_APPLICATION_08' && !(user_confirmation ==2) ){
		MMsg("选中“追加说明”后，只能前进到室主任审批环节，直到下次再走到这个环节，才能竣工。");
		return false;
	}
	
	//当选择竣工的时候，如果出差结束时间大于当前时间时不允许竣工，除非已经添加过追加说明
	var currentTime= getCurrentTime();//获取当前的时间
	var endTime=$("#BIZ_END_TIME").val();//获取出差结束时间
	var d1=new Date(currentTime.replace(/\-/g,'/'));
 	var d2=new Date(endTime.replace(/\-/g,'/'));

    if( (d1 < d2) && !(user_confirmation==2) && nextTchNum=='BUSINESS_APPLICATION_08'){
   		MMsg("当前时间小于出差结束时间，不允许竣工；可去添加追加说明，领导审批后可竣工。");
   		return false;
    }
    
    //竣工前，提示用户进行下载pdf附件，没下载不能竣工
	if(nextTchNum=='BUSINESS_APPLICATION_08' &&　!downLoadReady==1){
		MMsg("请进行下载出差申请单pdf,环节才能竣工！");
		return false;
	}
	
	//当所有判断完后，下一环节走到“竣工”的时候，保存附件到环节附件中。
	if(nextTchNum=='BUSINESS_APPLICATION_08'){
		parent.document.frames("fraToolBar").toOutPdf(true);
	}
	
	//当环节到达“用户确认”的时候，对隐藏框进行赋值，用于后续的判断使用
	if(nextTchNum=='BUSINESS_APPLICATION_02'){
		$("#USER_CONFIRMATION").val(2);
	}
	
	return true;
}

//用于确认环节： 判断用户选中的“是否追加说明”的值
function checkRadioValue(){
	var tempValue=$('input:radio[name="ADDITIONAL_INSTRCT"]:checked').val();
	if(tempValue==1){
		$("#ADIT_INSTRCT_DIV").css('display',"block");
		//当追加说明选是的时候，pdfButton2不显示，pdfButton2只显示在否的情况下。
		$("#pdfButton2").css("display","none");
	}else{
		$("#ADIT_INSTRCT_DIV").css('display',"none");
	}
	
	//首次环节到发起人确认环节的时候，追加说明选择是的时候，不显示下载按钮
	var adit_instrct=oForm.TABLE.CUST_JTITSM_BIZ_APP.USER_CONFIRMATION.DEFAULT_VALUE;
	if( (tempValue==1 && adit_instrct==2)){
		$("#pdfButton").css("display","block");
	}else{
		$("#pdfButton").css("display","none");
	}
	
	//首次到发起人环节，点击追加说明时，隐藏下载文件按钮
	var user_confirmation=$("#USER_CONFIRMATION").val();
	var currentTime= getCurrentTime();//获取当前的时间
	var endTime=$("#BIZ_END_TIME").val();//获取出差结束时间
	var d1=new Date(currentTime.replace(/\-/g,'/'));
 	var d2=new Date(endTime.replace(/\-/g,'/'));
	if(d1<d2 && !(user_confirmation==2)){
		$("#pdfButton").css("display","none");
	}else if(d1>d2 && !(user_confirmation==2) && tempValue==1){
		$("#pdfButton").css("display","none");
	}else{
		$("#pdfButton").css("display","block");
	}
	
	//首次到用户确认环节，出差日期未到，追加说明选择否的时候，提示不可下载按钮。  pdfButton2
	if(d1<d2 && !(user_confirmation==2) && tempValue==2){ 
	    $("#pdfButton").css("display","none");
		$("#pdfButton2").css("display","block");
	}
	
	var instrct_input=$("#ADIT_INSTRCT_INPUT").val();
	//当环节再次到发起人确认环节时，且添加说明框上次已填写值，追加说明框不可修改只做展示
	var user_confir=$("#USER_CONFIRMATION").val();
	if( tempValue==1 && user_confir==2 && !(instrct_input=="")){
		$("#ADIT_INSTRCT_INPUT").attr("readonly","readonly");
	}else{
		$("#ADIT_INSTRCT_INPUT").removeAttr("readonly");
	}
}

//首次到用户确认环节，出差日期未到，追加说明选择否的时候，提示不可下载
function notDownload(){
	MMsg("当前时间小于出差结束时间，不允许竣工；可去添加追加说明，领导审批后可竣工。");
}

//js获取当前的时间
function getCurrentTime(){
	var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var strMinutes = date.getMinutes();
    var strSeconds = date.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (strMinutes >= 0 && strMinutes <= 9) {
        strMinutes = "0" + strMinutes;
    }
    if (strSeconds >= 0 && strSeconds <= 9) {
        strSeconds = "0" + strSeconds;
    }
   
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + strMinutes
            + seperator2 + strSeconds;
    return currentdate;
}