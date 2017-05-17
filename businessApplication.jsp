<%@page language="java" pageEncoding="GBK"%>
<%@page import="com.bsnnms.bean.common.resource.ResourceLoader"%>

 <HTML XMLNS:IE>
<HEAD>
	<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" >
	<META http-equiv="Content-Type" content="text/html; charset=utf-8'>
	<TITLE>出差申请流程</TITLE>
	<link href='<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/css/businessApplication.css")%>' 
		type='text/css" rel="stylesheet" charset="gbk"/>
<STYLE type="text/css">
    @import url(<%=ResourceLoader.buildSrc("/resource/css/flow.css")%>);
    @import url(<%=ResourceLoader.buildSrc("/resource/css/publicCss.css")%>);
    @import url(<%=ResourceLoader.buildSrc("/resource/css/jtitsm/btn.css")%>);
    @import url(<%=ResourceLoader.buildSrc("/resource/css/jtitsm/table.css")%>);
    @import url(<%=ResourceLoader.buildSrc("/resource/css/jtitsm/page.css")%>);
    @import url(<%=ResourceLoader.buildSrc("/resource/css/blueForm.css")%>);
    @import url(<%=ResourceLoader.buildSrc("/resource/css/jtitsm/flowForm.css")%>);
    @import url(<%=ResourceLoader.buildSrc("/resource/js/ext/resources/css/ext-all.css")%>);
    @media all
	{
	   IE\:container { behavior:url(<%=ResourceLoader.buildSrc("/resource/htc/mpc.htc")%>);}
	   IE\:page {behavior:url(<%=ResourceLoader.buildSrc("/resource/htc/mpc.htc")%>);}
	   IE\:tree{behavior:url(<%=ResourceLoader.buildSrc("/resource/htc/tree.htc")%>);}
	}
</STYLE>
</HEAD>

<BODY>
<input type="hidden" id="FLOW_ID"/>
<input type="hidden" id="REQUEST_ID"/>
<input type="hidden" id="PDF_NUMBER"/><!-- PDF文档编号 -->
<input type="hidden" id="WORK_NUMBER"/><!--工单编号 -->
<input type="hidden" id="APPLICANT"/><!-- 申请人 -->
<input type="hidden" id="APPLICANT_ID"/><!-- 申请人ID -->
<input type="hidden" id="APPLY_DEPARTMENT"/><!-- 申请部门 -->
<input type="hidden" id="APPLICANT_MOBILE"/><!-- 联系电话 -->  
<input type="hidden" id="SUBMIT_TIME"/><!-- 申请时间 --> 
<input type="hidden" id="USER_CONFIRMATION"/><!-- 是否第二次到用户确认环节 --> 

<div id="mask_div" class="domainInfoCss"></div>
<!--头部的申请人信息 -->
<div style="text-align:center;position:relative;z-index:1;float:right;padding-top:10px;padding-right:7%;font-family:Microsoft YaHei;font-size:14px;color:#B3B3B3;">申请时间：
	<span id="SUBMIT_TIME_SPAN" style="color:#FF9900;font-weight:bold;"></span>&nbsp;&nbsp;申请人 >
	<span id="SUBMIT_STAFF_SPAN" style="color:rgb(139, 189, 232);font-weight:bold;"></span>
	<span style="margin-top:3px;">&nbsp;&nbsp;
		<img id='SUBMIT_STAFF_EDIT' src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/edit_grey.png")%>' style="cursor: pointer;" title="编辑">
	</span>
</div>
<div id="EDIT_STAFF_MOBILE_DIV" class="userInfoEditDiv">
	<div class="userInfoTitleDiv">
		<span class="userInfoCloseBut" onclick="this.parentElement.parentElement.style.display = 'none';
			getObj('mask_div').style.display='none';document.body.style.overflow = 'auto';" title="关闭">
			<img src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/close_blue.png")%>'>
		</span>
	</div>
	<!-- 弹出的修改框 -->
	<div class="userInfoEdiDiv">
		<label>所属部门:</label>
		<span id="EDIT_STAFF_ORG"></span>
	</div>
	<div class="userInfoEdiDiv">
		<label>申请人:</label>
		<span id="EDIT_STAFF_NAME"></span>
	</div>
	<div class="userInfoEdiDiv">
		<label>联系方式：</label>
		<input type="text" id="EDIT_STAFF_MOBILE_INPUT" />
	</div>	
	<div class="userInfoEdiBtnDiv">
		<button id="EDIT_STAFF_MOBILE_BTN" class="userInfoEdiBtn">保存</button>
	</div>
</div>
<!-- 出差申请 -->
<div class="out-div">
	<div class="center-div">
		<div class="model">
			<div class="model-head">
				<span class="img">
					<img id = 'business_application_but1'  style="cursor:pointer;" title="收起" 
						src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_hidden.png")%>' 
						onclick="getObj('business_application').style.display='none';
							getObj('business_application_but2').style.display='block';this.style.display='none';"/>
					<img id = 'business_application_but2' style="display:none;cursor:pointer;" title="展开" 
						src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_open.png")%>' 
						onclick="getObj('business_application').style.display='block';
							getObj('business_application_but1').style.display='block';this.style.display='none';"/>
				</span>
				<span>出差申请</span>
			</div>
			<div class="content" id="business_application">
				<div class="content3">
					
					<div class="line">
						<div class="line2 fl">
							<div class="text1 fl"><span class='red'>*&nbsp;</span><span>出差开始时间：</span></div>
							<div class="text1 fl"><input type='text' id="BIZ_BEGIN_TIME" class="input" title="点击选择时间" 
								onFocus="WdatePicker({isShowClear:true,dateFmt:'yyyy-MM-dd', readOnly:true})" readonly="readonly"></input></div>
						</div>
						<div class="line2 fr">
							<div class="text1 fl"><span class='red'>*&nbsp;</span><span>出差结束时间：</span></div>
							<div class="text1 fl"><input type='text' id="BIZ_END_TIME" class="input" title="点击选择时间" 
								onFocus="WdatePicker({isShowClear:true,dateFmt:'yyyy-MM-dd', readOnly:true})" readonly="readonly"></input></div>
						</div>
					</div>
					<div class="line">
						<div class="line2 fl">
							<div class="text1 fl"><span class='red'>*&nbsp;</span><span>出差地点：</span></div>
							<div class="text1 fl"><input type='text' id="BIZ_PLACE" class="input"></input></div>
						</div>
						<div class="line2 fr">
							<div class="text1 fl"><span class='red'>*&nbsp;</span><span>出差类型： &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
							<div class="text1 fl">
								<span id="BIZ_TYPE" style="display:none;"></span>
								<span id="BIZ_TYPE_SPAN" onchange="checkBizType()"></span>
							</div>
						</div>
					</div>
					<div class="line">
						<div class="line2 fl">
							<div class="text1 fl"><span class='red'>*&nbsp;</span><span>去程交通工具：</span></div>
							<div class="text1 fl">
								<span id="TRANSIT_VEHICLE" style="display:none;"></span>
								<span id="TRANSIT_VEHICLE_SPAN"></span>
							</div>
						</div>
						<div class="line2 fr">
							<div class="text1 fl"><span class='red'>*&nbsp;</span><span>去程订票方式：</span></div>
							<div class="text1 fl">
								<span id="GO_BOOKING" style="display:none;"></span>
								<span id="GO_BOOKING_SPAN"></span>
							</div>
						</div>
					</div>
					<div class="line">
						<div class="line2 fl">
							<div class="text1 fl"><span class='red'>*&nbsp;</span><span>返程交通工具：</span></div>
							<div class="text1 fl">
								<span id="RETURN_TRAFFIC" style="display:none;"></span>
								<span id="RETURN_TRAFFIC_SPAN"></span>
							</div>
						</div>
						<div class="line2 fr">
							<div class="text1 fl"><span class='red'>*&nbsp;</span><span>返程订票方式：</span></div>
							<div class="text1 fl">
								<span id="RETURN_BOOKING" style="display:none;"></span>
								<span id="RETURN_BOOKING_SPAN"></span>
							</div>
						</div>
					</div>
					<div class="line">
						<div class="line2 fl">
							<div class="text1 fl"><span class='red'>*&nbsp;</span><span>订房方式： &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
							<div class="text1 fl">
								<span id="RESERVATION_MODE" style="display:none;"></span>
								<span id="RESERVATION_MODE_SPAN"></span>
							</div>
						</div>
						<div class="line2 fr">
							<div class="text1 fl"><span class='red'>*&nbsp;</span><span>申请人及其他出差人：</span></div>
							<div class="text1 fl"><input type="text" id="BIZ_TRAVELLER" class="input"></input></div>
						</div>
					</div>
					<div class="line">
						<div class="line4 fl">
							<div class="text1 fl"><span class='red'>*&nbsp;</span><span>标题：</span></div>
							<div class="text1 fl"><input type="text" id="TITLE" class="input"></input></div>
						</div>
					</div>
					<div class="line">
						<div class="line5">
							<div class="text1 fl"><span class='red'>*&nbsp;</span><span>出差事由：</span></div>
							<div class="fl text-area"><textarea id='TRAVEL_REASON' class="text-area2"></textarea></div>
						</div>
					</div>
					<div class="line">
						<div class="line4 fl">
							<div class="text1 fl"><span class='red'>*&nbsp;</span><span>事由文件：</span></div>
							<font class="labelLink">
								<span id="ADD_ATTACHMENT" class="fl" style="text-align:left; margin-top:7px; 
									behavior: url('<%=ResourceLoader.buildSrc("/resource/htc/formAttach.htc")%>');WIDTH: 90%; right: left; 
									background-color: #FFFFFF;" isAllowHistory="true"></span>
						    </font>
						</div>
					</div>
					<div class="line">
						<div class="line6">
							<div class="text1 fl"><span>特殊情况说明：</span></div>
							<div class="fl text-area"><textarea id='SPECIAL_DESCRIPTION' class="text-area2"></textarea></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 培训申请 -->
    <div class="center-div" id="training_application_div" style="display: none;">
		<div class="model">
			<div class="model-head">
				<span class="img">
					<img id = 'training_application_but1' style="cursor:pointer;" title="收起" 
						src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_hidden.png")%>' 
						onclick="getObj('training_application').style.display='none';
							getObj('training_application_but2').style.display='block';this.style.display='none';"/>
					<img id = 'training_application_but2' style="display:none;cursor:pointer;" title="展开" 
						src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_open.png")%>' 
						onclick="getObj('training_application').style.display='block';
							getObj('training_application_but1').style.display='block';this.style.display='none';"/>
				</span>
				<span>培训申请</span>
			</div>
			
			<div class="content2" id="training_application">
				<div class="content3">
					
					<div class="line">
						<div class="line2 fl">
							<div class="text1 fl"><span class='red'>*&nbsp;</span><span>培训开始时间：</span></div>
							<div class="text1 fl"><input type='text' id="TRN_BEGIN_TIME" class="input" title="点击选择时间" 
								onFocus="WdatePicker({isShowClear:true,dateFmt:'yyyy-MM-dd', readOnly:true})" readonly="readonly"></input></div>
						</div>
						<div class="line2 fr">
							<div class="text1 fl"><span class='red'>*&nbsp;</span><span>培训结束时间：</span></div>
							<div class="text1 fl"><input type='text' id="TRN_END_TIME" class="input" title="点击选择时间" 
								onFocus="WdatePicker({isShowClear:true,dateFmt:'yyyy-MM-dd', readOnly:true})" readonly="readonly"></input></div>
						</div>
					</div>
					<div class="line">
						<div class="line2 fl">
							<div class="text1 fl"><span class='red'>*&nbsp;</span><span>培训地点：</span></div>
							<div class="text1 fl"><input type='text' id="TRN_PLACE" class="input"></input></div>
						</div>
						<div class="line2 fr">
							<div class="text1 fl"><span class='red'>*&nbsp;</span><span>培训费用：</span></div>
							<div class="text1 fl"><input type='text' id="TRN_COST" class="input"></input></div>
						</div>
					</div>
					<div class="line">
						<div class="line4 fl">
							<div class="text1 fl"><span class='red'>*&nbsp;</span><span>培训人员：</span></div>
							<div class="text1 fl"><input type="text" id="TRN_PERSON" class="input"></input></div>
						</div>
					</div>
					<div class="line">
						<div class="line5">
							<div class="text1 fl"><span class='red'>*&nbsp;</span><span>培训内容：</span></div>
							<div class="fl text-area"><textarea id='TRAVEL_CONTENT' class="text-area2"></textarea></div>
						</div>
					</div>
				</div>
			</div>
		</div>
    </div>
   
	<!-- 追加说明 -->
	<div class="center-div" id="add_instrct_div" style="display: none;">
		<div class="model">
			<div class="model-head">
				<span class="img">
					<img id = 'add_instrct_but1' style="cursor:pointer;" title="收起" 
						src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_hidden.png")%>' 
						onclick="getObj('add_instrct').style.display='none';
							getObj('add_instrct_but2').style.display='block';this.style.display='none';"/>
					<img id = 'add_instrct_but2' style="display:none;cursor:pointer;" title="展开" 
						src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_open.png")%>' 
						onclick="getObj('add_instrct').style.display='block';
							getObj('add_instrct_but1').style.display='block';this.style.display='none';"/>
				</span>
				<span>追加说明</span>
			</div>
			
			<div class="content4" id="add_instrct">
				<div class="content3">
					<div class="line">
						<div class="line6 fl">
							<div class="text1 fl"><span class='red'>*&nbsp;</span><span>追加说明：</span></div>
							<div class="text1 fl"><textarea id='ADIT_INSTRCT' class="text-area2"></textarea></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 处理过程 -->
	<div id="flowFlogDiv" style="width: 90%;display:none; text-align:center;">
		<div class="div_blue" style="width: 100%;">
	    	<span style="float:right;">
	    		<img id='flow_Flog_but1' style="cursor:pointer;" title="收起" 
	    			src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_hidden.png")%>' 
	    			onclick="getObj('showPanel').style.display='none'; getObj('flow_Flog_but2').style.display='block';this.style.display='none';"> 
	    		<img id='flow_Flog_but2' style="display:none;cursor:pointer;" title="展开" 
	    			src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_open.png")%>' 
	    			onclick="getObj('showPanel').style.display='block'; getObj('flow_Flog_but1').style.display='block';this.style.display='none';">
	    	</span> 处理过程
		</div>
		<!--处理过程(列表方式): -->
		<div id="showPanel" class="divBox" style="background:#ffffff;text-align:left; width: 100%;">
		    <span id="chartShow" style="margin-left:40px;cursor:hand;text-Decoration:underline;font-size:13px;color:#0046D5;" 
		    	onclick="getProc(oForm)" onmouseover="this.style.color='#FF0000';" onmouseout="this.style.color='#0046D5';">
		    	<font style="font-family:Webdings;font-size:18px;">4</font> 图形风格展示
		    </span> 
		    <iframe src="about:blank" style="width: 100%; height: 100%; border: 0px solid black;overflow-y:none;" 
		    	frameborder="0" id="oFlowProcFrame"></iframe>
		</div>
	</div>
</div>

<!-- 用户确认环节，增加"是否追加说明" -->
<div id="ADDITIONAL_INSTRCT_DIV" style="display:none; height:30px; border-style:none">
	<label style="font-size:14px;color:#555;">&nbsp;&nbsp;是否追加说明：</label>
	<span onValueChange="oForm.execFlowUIHook();" id="ADDITIONAL_INSTRCT" onclick="checkRadioValue()"></span>
	<input type="button" onclick="exportPdf()" id="pdfButton" value="点击下载申请单" class="download_btn" style="margin-top: 5px;"></input>
	<!-- 首次到用户确认环节，出差日期未到，追加说明选择否的时候，提示不可下载按钮 -->
	<input type="button" onclick="notDownload()" id="pdfButton2" value="点击下载申请单" 
		class="download_btn" style="margin-top: 5px; display: none;"></input>
	<div class="line" style="display: none;" id=ADIT_INSTRCT_DIV>
		<div class="line7">
			<div class="fl text-area4"><textarea id='ADIT_INSTRCT_INPUT' class="text-area3"></textarea></div>
		</div>
	</div>
</div>

<!-- 室主任审批，增加室主任意见 -->
<div id="DIRECTOR_ADVICE_DIV" style="display:none;height:30px;">
	<label style="font-size:14px;color:#555;"><span class="red fl">&nbsp;*</span>室主任意见：</label>
	<span onValueChange="oForm.execFlowUIHook();" id="DIRECTOR_ADVICE"></span>
</div>
<!-- 人事专员审批，增加人事专员意见 -->
<div id="HR_ADVICE_DIV" style="display:none;height:30px;">
	<label style="font-size:14px;color:#555;"><span class="red fl">&nbsp;*</span>人事专员意见：</label>
	<span onValueChange="oForm.execFlowUIHook();" id="HR_ADVICE"></span>
</div>
<!-- 分部主任审批，增加分部主任意见 -->
<div id="SECTION_DIREC_ADVICE_DIV" style="display:none;height:30px;">
	<label style="font-size:14px;color:#555;"><span class="red fl">&nbsp;*</span>分部主任意见：</label>
	<span onValueChange="oForm.execFlowUIHook();" id="SECTION_DIREC_ADVICE"></span>
</div>
<!-- IT运营中心主任审批，增加IT运营中心主任意见 -->
<div id="OPERTER_CENTER_ADVICE_DIV" style="display:none;height:30px;">
	<label style="font-size:14px;color:#555;"><span class="red fl">&nbsp;*</span>IT运营中心主任意见：</label>
	<span onValueChange="oForm.execFlowUIHook();" id="OPERTER_CENTER_ADVICE"></span>
</div>
</BODY>

<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/Common.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/Dialog.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/Error.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/ChoiceDialog.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/assets/js/jquery-1.7.2.min.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/My97DatePicker/WdatePicker.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/XML.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/XMLTree/XMLTree.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/XMLTree/XMLTreeAction.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/jqueryUI/ui/minified/jquery-ui.min.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/util/upload.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/jtitsmFormCommon.js")%>"></script>
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/jtitsmFormCommon2.js")%>'></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/businessApplication.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/commonUtil.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/tableForMul.js")%>"></script>	
</HTML>