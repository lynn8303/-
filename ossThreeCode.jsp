<%@page language="java" pageEncoding="GBK"%>
<%@page import="com.bsnnms.bean.common.resource.ResourceLoader" %>
<%@page import="com.bsnnms.bean.common.HtmlUtils"%>
<%@page import="com.bsnnms.bean.common.util.DatabaseUtil"%>
<jsp:useBean id="pubFun" scope="request" class="com.bsnnms.servlet.logicaudit.PubFun" /> 
<html xmlns:ie="">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" >
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>OSS三码融合</title>
    <style type="text/css">
        @import url(<%=ResourceLoader.buildSrc("/resource/css/flow.css")%>);
        @import url(<%=ResourceLoader.buildSrc("/resource/css/publicCss.css")%>);
        @import url(<%=ResourceLoader.buildSrc("/resource/css/jtitsm/btn.css")%>);
        @import url(<%=ResourceLoader.buildSrc("/resource/css/jtitsm/table.css")%>);
        @import url(<%=ResourceLoader.buildSrc("/resource/css/jtitsm/page.css")%>);
        @import url(<%=ResourceLoader.buildSrc("/resource/css/blueForm.css")%>);
        @import url(<%=ResourceLoader.buildSrc("/resource/css/jtitsm/flowForm.css")%>);
        body{margin-top:0px;background:#e5e9ec;margin-bottom:20px;}
        td .second_title {font-size: 14px; font-weight: bold; text-align: left;}
        .p_main {margin-left: 15px; margin-top: 20px; clear: both;}
        .p_main .right_part {width: 828px; margin-left: 10px;	float: left;}
		.div_f8 {background-color: #f8f8f8; padding: 15px 10px; margin-bottom: 10px;}
		.p_table_container3 {width: 100%;}
		.tableHead {height: 30px; background-color: #8bbde8; color: white; font-size: 14px; font-weight: bold; text-align: center;}
		.tableHead td {font-size: 14px;}
		.div_f8 input.pageInputCss {border: 1px solid #CCCCCC; width: 30px; text-align: center; height: 16px; line-height: 16px; margin: 0px; padding: 0px;}
    	.div_f8 .pageButNormalCss {padding-top: 0px;}
    	.loading-indicator {
			height: 80px;
			width: 80px;
			background: url(<%=ResourceLoader.buildSrc("/resource/js/showLoading/images/loading.gif")%>);
			background-repeat: no-repeat;
			background-position: center center;
		}
		.loading-indicator-overlay {
			opacity: 0.6;
			filter: alpha(opacity = 60);
		}
		.INPUT_WITH_BORDER{
			border:1px solid #cccccc;
		}
		.labelLinkOver {
			cursor:hand;
			text-decoration:underline;
			color:#FF0000;
		}
		.linkspan{
			cursor:hand; 
			COLOR:#066AD9; 
			FONT-FAMILY: Microsoft YaHei;
			TEXT-DECORATION: underline; 
		}
		.labelLink {
			cursor:hand; 
			FONT-SIZE:14px; 
			COLOR:#066AD9; 
			LINE-HEIGHT: 20px; 
			FONT-FAMILY: "arial", "仿宋"; 
			TEXT-DECORATION: underline; 
		}
		.backbuttom{
			color: #fff; 
			padding-top: 3px; 
			padding-bottom: 3px; 
			font-family: "Microsoft YaHei"; 
			font-size: 12px; 
			font-weight: bold; 
			margin-top: 7px; 
			margin-right: 12px; 
			margin-bottom: 5px;
			width:60px; 
			cursor: hand; 
			background-image: none; 
			background-attachment: scroll; 
			background-repeat: repeat; 
			background-position-x: 0%; 
			background-position-y: 0%; 
			background-color: #1c6efb;
		}
		.hisDiv{
			width:80%;
			height:60%;
			z-index: 200; 
			display:none;
			position: absolute; left: 50%; top: 50%;
			transform: translate(-50%, -50%); 
		}
		.flowDivCss{
			display:none;
			z-index: 12001; 
			overflow:true; 
			background-color:#ECF0F2;
			text-align:left; 
			position:absolute;
			padding:0px;
			border:2px #99CCFF solid;
		}
		
		.required{
			color:red;
			float:left;
			margin-top:2px;
		}
		.itemOverCss{
			color: #FFFFFF;
			cursor: hand;
			background-color:#4068AA;
			font-weight:bold;
			margin-top:2px;
		}
		.mustfillfont{
			width:auto;
			color:#FFAE00;
			font-size:10px;
			font-family:'宋体';
			margin:0 3px 0 0;
		}
    </style>
</head>
<!-- 缓存代码 -->
<%=HtmlUtils.outHtmlData("ITSM_OSS_BELONG_MAJOR", pubFun.getSelect("select code,mean from codelist where code_type='ITSM_OSS_BELONG_MAJOR' order by sort_id"))%>
<%=HtmlUtils.outHtmlData("ITSM_OSS_IF_UNDERTAKE", pubFun.getSelect("SELECT CODE,MEAN FROM CODELIST WHERE CODE_TYPE = 'ITSM_OSS_IF_UNDERTAKE' ORDER BY SORT_ID"))%>
<%=HtmlUtils.outHtmlData("OSS_AUDIT_OPINION", pubFun.getSelect("SELECT CODE,MEAN FROM CODELIST WHERE CODE_TYPE = 'ITSM_OSS_IF_UNDERTAKE' ORDER BY SORT_ID"))%>

<body>
<div id="mask_div" class="domainInfoCss"></div>
<div style="text-align:center;">
	<div class="divBox">
		<div>
			<div class="div_blue" style="width:1190px;">
				<span style="float:right;">
					<img id='apply_info_but1' src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_hidden.png")%>' 
						style="cursor:pointer;" title="收起" onclick="getObj('apply_info').style.display='none'; 
						getObj('apply_info_but2').style.display='block';this.style.display='none';"> 
						<img id='apply_info_but2' src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_open.png")%>' 
							style="display:none;cursor:pointer;" title="展开" 
							onclick="getObj('apply_info').style.display='block'; 
							getObj('apply_info_but1').style.display='block';this.style.display='none';">
				</span> 申请内容
			</div>
			<div id="apply_info" class="divBlock">
    		<table class="table">                            
        		<tr>
            		<td colspan=2 class="whiteBlock" style="width:56%">
	                	<div class="block_white4">
	                    	<label for="TITLE">需求标题：</label>
	                    	<input id="TITLE" style="line-height:14px;width:400px;" title="填入标题">
	                	</div>
            		</td>
            		<td colspan=2 class="whiteBlock" style="width:44%">
		                <div class="block_white4">
		                    <label for="SERIAL">工单编号：</label>
		                    <input id="SERIAL" style="line-height:14px;width:300px;" readonly />
		                </div>
		            </td>
        		</tr>
        		<tr>
		            <td colspan=1 class="whiteBlock" style="width:28%">
		                <div class="block_white4">
		                    <label for="REQ_TYPE">需求分类：</label>
		                    <select id="REQ_TYPE" style="width:200px;"></select>
		                </div>
		            </td>
		            <td colspan=1 class="whiteBlock" style="width:28%">
		                <div class="block_white4">
		                    <label for="PLAN_FINISH_TIME">计划完成时间：</label>
		                    <input type="text" id="PLAN_FINISH_TIME"  style="line-height:14px;width:120px;cursor:hand;" title="点击选择时间" 
		                    	onFocus="WdatePicker({isShowClear:true,dateFmt:'yyyy-MM-dd', readOnly:true})" readonly="readonly"/>
		                </div>
		            </td>
		            <td colspan=1 class="whiteBlock" style="width:22%">
		                <div class="block_white4">
		                    <label for="APPLY_DATE">申请时间：</label>
		                    <input type="text" id="APPLY_DATE"  style="line-height:14px;width:120px;cursor:hand;" title="点击选择时间" 
		                    	onFocus="WdatePicker({isShowClear:true,dateFmt:'yyyy-MM-dd', readOnly:true})" readonly="readonly"/>
		                </div>
		            </td>
		            <td colspan=1 class="whiteBlock" style="width:22%">
		                <div class="block_white4">
		                    <label for="APPLY_RIGION">申请区域：</label>
		                    <input type="text" id="APPLY_RIGION" onclick="selectRegion(APPLY_REGION_ID,APPLY_RIGION)"  
		                    	style="line-height:14px;width:120px;" readonly="readonly"/>
		                </div>
		            </td>
		        </tr>

		        <tr>
		            <td colspan="4" class="whiteBlock">
		                <div class="block_white4">
		                    <label style="float:left;" for="REQ_DESC">需求描述：</label> 
		                    <span id="REQ_DESC_L" style="font-size:12px;padding-top:3px;width:1050px;display:none;"></span> 
		                    <textarea id="REQ_DESC" style="height:170px;width:950px;" title="请填写需求描述"></textarea>
		                </div>
		            </td>
		        </tr>
       
		        <tr>
					<td  colspan="4" class="whiteBlock">
						<div class="block_white4">
							<label for="APPENDIXS">附件：</label>													
							<span id="APPENDIXS" style="behavior: url(<%=ResourceLoader.buildSrc("/resource/htc/formAttach.htc")%>);WIDTH: 88%; right: left; border: 1px solid #94B0CB; background-color: #EFF4FE; margin-top:3px;" isAllowHistory="true"></span>			
						</div>
					</td>
				</tr>
		    </table>
			</div>
		</div> 
	
		<DIV ID="REQ_UNDERTAKE_DIV" style="width:100%;display:none;">
	   		<div class="divBlock" style="width:100%;" >
		        <table class="table" style="width:100%;">
		        	<tr>
		            	<td colspan="4" class="whiteBlock">
		                    <div class="block_white4" style="over-flow: hidden;line-height:40px;height:40px;">
	                        	<label for="IF_UNDERTAKE_DIV">需求是否承接：</label>
	                        	<span id="IF_UNDERTAKE_DIV" style="width:50%;vertical-align:middle;"></span>
	                        </div>
		                </td>
		            </tr>
		            <tr id = "MAJOR_TR" style="display:none;">
		            	<td colspan="4" class="whiteBlock">
		                    <div class="block_white4" style="over-flow: hidden;line-height:40px;height:40px;">
	                        	<label for="REQ_BELONG_MAJOR_DIV">需求所属专业：</label>
	                        	<span id="REQ_BELONG_MAJOR_DIV" style="width:50%;vertical-align:middle;"></span>
	                        </div>
		                </td>
		            </tr>
		        </table>
		    </div>
		    <div id="MSS_REQ_DIV">
		    <!-- 
		    	<fieldset id="MSS_REQ_FIELDSET" class="fieldsetCss" style="display:none;width:99%;margin-left:1%;margin-top:5px;padding-top:5px;border:1px dashed #98C8FF;">
					<legend style="width:150px;text-align:center;color: #125899;">MSS需求单</legend>
					
					<table class="table" style="width:100%;">
			        	<tr>
			                <td colspan=2 class="whiteBlock" style="width:56%">
	                            <div class="block_white4">
	                             	<label for="MSS_TITLE">标题:</label>
									<input id="MSS_TITLE" style="line-height:14px;width:80%;">
		                        </div>
	                        </td>
	                        <td colspan=2 class="whiteBlock" style="width:44%">
	                            <div class="block_white4">
	                                <label for="MSS_SYSTEM">涉及系统:</label>
									<input id="MSS_SYSTEM" onclick="selectSystem();" title="点击选择系统" style="cursor:hand;line-height:14px;width:80%;" readonly>
								</div>
	                            
	                        </td>
			            </tr>
			            <tr>
			            	<td colspan="4" class="whiteBlock">
			                    <div class="block_white4" style="over-flow: hidden;line-height:40px;height:40px;">
			                       	<label for="MSS_PHE" style='width:12%'>现象描述:</label>
									<span>
										<IFRAME ID="MSS_PHE" src="/resource/ewebeditor/ewebeditor.htm?id=MSS_PHE&style=itnm&tmpDir=temp&skin=blue1" 
							         			 frameborder="0" scrolling="no" width=100% height="240" style='border-bottom:1px solid #97a5a8'></IFRAME> 
									</span> 	
		                        </div>
			                </td>
			            </tr>
			            <tr>
			            	<td colspan="4">
				            	<div class="block_white4">
									<label for="MSS_ATTACH">附件：</label>													
									<span id="MSS_ATTACH" style="behavior: url(/resource/htc/formAttach.htc);WIDTH: 95%; vertical-align:middle;right: left; border: 1px solid #94B0CB; background-color: #EFF4FE; margin-top:3px;" isAllowHistory="true"></span>			
								</div>
							</td>
			            </tr>
			        </table>
				</fieldset>
				 -->
		    </div>
		</div>
					
		<DIV ID="OSS_AUDIT_DIV" style="width:100%;display:none;">
	   		<div class="divBlock" style="width:100%;" >
		        <table class="table" style="width:100%;">
		        	<tr>
		            	<td colspan="4" class="whiteBlock">
		                    <div class="block_white4" style="over-flow: hidden;line-height:40px;height:40px;">
	                        	<label for="OSS_AUDIT_OPINION_DIV">OSS需求审核意见：</label>
	                        	<span id="OSS_AUDIT_OPINION_DIV" style="width:50%;vertical-align:middle;"></span>
	                        </div>
		                </td>
		            </tr>
		        </table>
		    </div>
		</div>
	
	</div>
			            
    <div>
    	<div class="div_blue">
    		<span style="float:right;">
                <img id='staff_info_but1'  src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_hidden.png")%>' 
                	style="cursor:pointer;" title="收起"  onclick="getObj('staff_info').style.display='none'; 
                	getObj('staff_info_but2').style.display='block';this.style.display='none';"> 
                <img id='staff_info_but2' src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_open.png")%>'
                    style="display:none;cursor:pointer;" title="展开" onclick="getObj('staff_info').style.display='block'; 
                    getObj('staff_info_but1').style.display='block';this.style.display='none';">
            </span>申请人信息
        </div>
        <div id="staff_info" class="divBlock">
            <table class="table" style="width:100%;">
                <tr>
                	<td style="width:50%;" class="disabledBlock">
                		<div class="block_white4">
                			<label for="SUBMIT_STAFF">
                				<img src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_b_user.png")%>'>提出人：</label> 
                            <input id="SUBMIT_STAFF" readonly="readonly" />
                        </div>
                    </td>
                    <td style="width:50%;padding-left:10px;" class="disabledBlock">
                    	<div class="block_white4">
                    		<label for="SUBMIT_STAFF_ORG">
                    			<img src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_g_department.png")%>'>申请部门：</label> 
                            <input id="SUBMIT_STAFF_ORG" readonly="readonly" />
                        </div>
                    </td>
                </tr>
                <tr>
                 	<td style="width:50%;" class="whiteBlock">
                 		<div class="block_white4">
                 			<label for="SUBMIT_STAFF_EMAIL">
                 				<img src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_b_mail.png")%>'>邮&nbsp;&nbsp;&nbsp;&nbsp;箱：</label> 
                            <input id="SUBMIT_STAFF_EMAIL" />
                        </div>
                    </td>
                    <td style="width:50%;padding-left:10px;" class="whiteBlock">
                    	<div class="block_white4">
                    		<label for="SUBMIT_STAFF_MOBILE">
                    			<img src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_b_phone.png")%>'>联系电话：</label> 
                            <input id="SUBMIT_STAFF_MOBILE" />
                        </div>
                    </td>
                </tr>
            </table>
    	</div>
    </div>       
    
    <div id="flowFlogDiv" style="width:1190px;display:none;">
     	<div class="div_blue" style="width:1190px;">
        	<span style="float:right;">
        		<img id='flow_Flog_but1' src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_hidden.png")%>' 
        			style="cursor:pointer;" title="收起" onclick="getObj('showPanel').style.display='none'; 
        			getObj('flow_Flog_but2').style.display='block';this.style.display='none';"> 
        		<img id='flow_Flog_but2' src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_open.png")%>' 
        			style="display:none;cursor:pointer;" title="展开" onclick="getObj('showPanel').style.display='block'; 
        			getObj('flow_Flog_but1').style.display='block';this.style.display='none';"></span> 处理过程
        </div>
        <!--处理过程(列表方式): -->
        <div id="showPanel" class="divBox" style="background:#ffffff;text-align:left;">
        	<span id="chartShow" style="margin-left:40px;cursor:hand;text-Decoration:underline;font-size:13px;
        		color:#0046D5;" onclick="getProc(oForm)" onmouseover="this.style.color='#FF0000';" 
        		onmouseout="this.style.color='#0046D5';">
        		<font style="font-family:Webdings;font-size:18px;">4</font> 图形风格展示</span> 
        		<iframe src="about:blank" style="width: 100%; height: 100%; border: 0px solid black;overflow-y:none;" 
        			frameborder="0" id="oFlowProcFrame"></iframe>
        </div>
    </div>             
</div>
      
<div class="errorDivCss" id="error_div"></div>
<div style="display: none" id="hiddenDiv">
    <input type="hidden" id="FLOW_ID" />
	<input type="hidden" id="REQUEST_ID" />
	<input type="hidden" id="SUBMIT_STAFF_ORG_ID" />
	<input type="hidden" id="SUBMIT_STAFF_ID" />
	<input type="hidden" id="APPLY_REGION_ID" />
	<input type="hidden" id="IF_UNDERTAKE" />
	<input type="hidden" id="OSS_AUDIT_OPINION" />
	<input type="hidden" id="REQ_BELONG_MAJOR" />
	
</div>
</div>
<iframe name="downloadFrame" style="display:none"></iframe>

<form id="exportExcelForm" action="" method="post" TARGET="downloadFrame">
	<input type="hidden" name="param">
</form>
</body>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/Common.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/Dialog.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/Error.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/ChoiceDialog.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/jQuery/jquery-1.8.3.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/jQuery/jquery-1.10.1.min.js")%>"></script> 
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/My97DatePicker/WdatePicker.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/showLoading/jquery.showLoading.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/XML.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/XMLTree/XMLTree.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/XMLTree/XMLTreeAction.js")%>"></script>   
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/jtitsmFormCommon.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/jtitsmFormCommon2.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/ompatibleCommon2.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/ossThreeCode.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/ewebeditor/eFormEditor.js")%>"></script> 
</html>