
<%@page language="java" pageEncoding="GBK" %>
<%@ page import="com.bsnnms.bean.common.resource.ResourceLoader" %>
<%@page import="com.bsnnms.bean.common.HtmlUtils" %>
<jsp:useBean id="pubFun" scope="request" class="com.bsnnms.servlet.logicaudit.PubFun"/>
<HTML XMLNS:IE>
<HEAD>
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
    <META http-equiv="Content-Type" content="text/html; charset=utf-8">
    <TITLE>人员离职账号回收流程表单</TITLE>
    <IMPORT namespace="IE" implementation="<%=ResourceLoader.buildSrc("/resource/htc/dbTree.htc")%>"/>
    <link href="<%=ResourceLoader.buildSrc("/resource/css/publicCss.css")%>" type="text/css" rel="stylesheet" charset="gbk"/>  
    <link href="<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/css/leaveRecovery.css")%>" type="text/css" rel="stylesheet" charset="gbk"/>
    <STYLE type="text/css">
        @import url(<%=ResourceLoader.buildSrc("/resource/css/flow.css")%>);
        @import url(<%=ResourceLoader.buildSrc("/resource/css/publicCss.css")%>);
        @import url(<%=ResourceLoader.buildSrc("/resource/css/jtitsm/btn.css")%>);
        @import url(<%=ResourceLoader.buildSrc("/resource/css/jtitsm/table.css")%>);
        @import url(<%=ResourceLoader.buildSrc("/resource/css/jtitsm/page.css")%>);
        @import url(<%=ResourceLoader.buildSrc("/resource/css/blueForm.css")%>);
        @import url(<%=ResourceLoader.buildSrc("/resource/css/jtitsm/flowForm.css")%>);
        @import url(<%=ResourceLoader.buildSrc("/resource/js/jqueryUI/themes/base/jquery-ui.css")%>);
        /*@import url(
        <%=ResourceLoader.buildSrc("/assets/plugins/boostrapv3/css/bootstrap.min.css")%>
        );
        @import url(
        <%=ResourceLoader.buildSrc("/resource/js/jQuery/DataTables-1.10.5/media/css/jquery.dataTables.css")%> );*/
    </STYLE>
</head>
<BODY>
<input type="hidden" id="REQUEST_ID" value=''>
<input type="hidden" id="FLOW_ID" value=''>
<input type="hidden" id="SUBMIT_STAFF_ID"/>
<input type="hidden" id="SUBMIT_ORG_ID">
<div class="out-div">
    <div class="center-div">
        <div class="model">
            <div class="model-head">
					<span class="img">
						<img id='apply-content_but1' style="cursor:pointer;" title="收起"
                             src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_hidden.png")%>'
                             onclick="getObj('apply-content').style.display='none';
								getObj('apply-content_but2').style.display='block';this.style.display='none';"/>
						<img id='apply-content_but2' style="display:none;cursor:pointer;" title="展开"
                             src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_open.png")%>'
                             onclick="getObj('apply-content').style.display='block';
								getObj('apply-content_but1').style.display='block';this.style.display='none';"/>
					</span>
                <span class="bold">申请内容</span>
            </div>
            <div class="content" id="apply-content">
                <div class="content1">

                    <div class="line">
                        <div class="line3">
                            <div class="text1 fl"><span class='red'>*&nbsp;</span><span>工单主题：</span></div>
                            <div class="fl"><input type='text' id="TITLE" style="height:26px"></div>

                        </div>
                    </div>

                    <div class="line">
                        <div class="line2  fl">
                            <div class="text1 fl"><span class='red'>*&nbsp;</span><span>离职人员：</span></div>
                            <div class="fl">
                                <input type='text' onclick="choosePersonOther(LEAVE_STAFF_ID,LEAVE_STAFF_NAME);"
                                       id="LEAVE_STAFF_NAME" name="LEAVE_STAFF_NAME" style="height:26px">
                                <input type='hidden' name="LEAVE_STAFF_ID" id="LEAVE_STAFF_ID">
                            </div>
                        </div>

                        <div class="line2 fl line2_margin">
                            <div class="text1 fl"><span class='red'>*&nbsp;</span><span>所属运营室：</span></div>
                            <div class="fl">
                                <span>
                                    <IE:dbTree style="margin-top:6px;border:0px;font-family:'Microsoft YaHei'; 
                                    	font-size: 14px;color: #555;"  id="LEAVE_ORG_ID" treeHeight="200" width="100%" cfg="jtitsm_leave_org_tree"/>
	               		 		</span>
                               <input name="LEAVE_ORG_NAME" id="LEAVE_ORG_NAME" type="hidden" style="height:26px">
                            </div>
                        </div>
                        
                        <div class="line2 line2_margin fr">
                            <div class="text1 fl"><span class='red'>*&nbsp;</span><span>期望完成时间：</span></div>
                            <div class="fl">
                                <input type="text" id="EXPECTED_TIME" style="height: 26px;border:0px"
                                       class="<%--Wdate--%> input"
                                       onFocus="WdatePicker({isShowClear:true,dateFmt:'yyyy-MM-dd',minDate: '%y-%M-#{%d+3}', readOnly:true})"
                                       readonly="readonly"/>
                            </div>
                        </div>
                    </div>

                    <div class="line">
                        <div class="line3">
                            <div class="text1 fl"><span>附件：</span></div>
                            <div id="ATTACHMENT_APPLY"
                                 style='text-align:left;margin-top:9px;WIDTH:90%;float:left;background-color:#fff;
                                 behavior:url(<%=ResourceLoader.buildSrc("/resource/htc/formAttach.htc")%>)'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="model">
            <div class="model-head">
					<span class="img">
						<img id='apply_sys_but1' style="cursor:pointer;" title="收起" 
                            src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_hidden.png")%>'
                            onclick="getObj('apply_sys').style.display='none';
								getObj('apply_sys_but2').style.display='block';this.style.display='none';"/>
						<img id='apply_sys_but2' style="display:none;cursor:pointer;" title="展开" 
                            src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_open.png")%>'
                            onclick="getObj('apply_sys').style.display='block';
								getObj('apply_sys_but1').style.display='block';this.style.display='none';"/>
					</span>
                <span class="bold">涉及系统</span>
            </div>
            
            <div class="content" id="apply_sys">
                <div class="content1">
                    <div class="line">
                        <div class="line3 line3_text fl" style="background-color: #fff">
                            <p><b>提示信息：</b>1.账号信息收集时，添加涉及系统；2.业务室审核分派时，选择系统室处理人；3.系统账号回收时，填写处理说明。</p>
                        </div>
                    </div>
                    
                    <div class="line">
                        <div class="line3">
                            <div class="text1 fl"><span>附件：</span></div>
                            <div id="ATTACHMENT_SYS" style='text-align:left;margin-top:9px;WIDTH:90%;float:left;
                            	background-color:#fff;behavior:url(<%=ResourceLoader.buildSrc("/resource/htc/formAttach.htc)")%>'></div>
                        </div>
                    </div>
                    
                    <div class="line">
                        <div class="line3" style="border: 0px;">
                            <table id='leaveData' class='tableCss' style="display:none;">
                                <tr>
                                    <td colspan=6 style="color:red;font-size:12px;">
                                        <span style="color:#ff5d17;display: none;" class="SUM_MACHINE_INFO">提示：</span>
                                    </td>
                                    <td colspan=2 style="text-align: right;" class='pageTdCss'></td>
                                </tr>
                                <tr class="tHeadCss">
                                    <td style="font-size: 12px;width: 4%">序号</td>
                                    <td style="font-size: 12px;width: 15%">运营室</td>
                                    <td style="font-size: 12px;width: 15%">系统名称</td>
                                    <td style="font-size: 12px;width: 15%">运营室分发人</td>
                                    <td style="font-size: 12px;width: 15%">系统室处理人</td>
                                    <td style="font-size: 12px;width: 10%">处理说明</td>
                                    <td style="font-size: 12px;width: 20%">处理时间</td>
                                    <td style="font-size: 12px;width: 6%">操作</td>
                                </tr>
                            </table>
                            
                            <table id='leaveData2' class='tableCss' <%--style="display:none;"--%>>
                                <tr>
                                    <td colspan=5 style="color:red;font-size:12px;">
                                        <span style="color:#ff5d17;display: none;" class="SUM_MACHINE_INFO">提示：</span>
                                    </td>
                                    <td colspan=2 style="text-align: right;" class='pageTdCss'></td>
                                </tr>
                                <tr class="tHeadCss">
                                    <td style="font-size: 12px;width: 4%">序号</td>
                                    <td style="font-size: 12px;width: 18%">运营室</td>
                                    <td style="font-size: 12px;width: 18%">系统名称</td>
                                    <td style="font-size: 12px;width: 18%">运营室分发人</td>
                                    <td style="font-size: 12px;width: 16%">系统室处理人</td>
                                    <td style="font-size: 12px;width: 12%">处理说明</td>
                                    <td style="font-size: 12px;width: 14%">处理时间</td>
                                </tr>
                            </table>

                            <div class=" addDivCss"<%--  onclick="addVM()"--%>
                                 style="height: 26px;width:100%;padding-left: 0px;" id="addSystemDiv"
                                 onclick="selectSystem_belongSystem()"
                                 onmouseover="getObj('addImg1').src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/add_o.png")%>'"
                                 onmouseout="getObj('addImg1').src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/add_b.png")%>'">
                                <img id="addImg1" src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/add_b.png")%>'>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="model">
            <div class="model-head">
					<span class="img">
						<img id='apply_msg_but1' style="cursor:pointer;" title="收起"
                             src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_hidden.png")%>'
                             onclick="getObj('apply_msg').style.display='none';
								getObj('apply_msg_but2').style.display='block';this.style.display='none';"/>
						<img id='apply_msg_but2' style="display:none;cursor:pointer;" title="展开"
                             src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_open.png")%>'
                             onclick="getObj('apply_msg').style.display='block';
								getObj('apply_msg_but1').style.display='block';this.style.display='none';"/>
					</span>
                <span class="bold">申请人信息</span>
            </div>
            
            <div class="content" id="apply_msg">
                <div class="content1">
                    <div class="line">
                        <div class="line4 fl" style="background-color: #F8F8F8">
                            <div class='red fl'>*&nbsp;</div>
                            <div class="apply-person fl"><span>申请人：</span></div>
                            <div class="text1 fl">
                                <input type='text' id="SUBMIT_STAFF_NAME" style="background-color: #F8F8F8" readonly="readonly"/>
                            </div>
                        </div>
                        <div class="line4 fr" style="background-color: #F8F8F8">
                            <div class='red fl'>*&nbsp;</div>
                            <div class="apply-org fl">申请部门：</div>
                            <div class="text1 fl">
                                <input type='text1 fl' id="SUBMIT_ORG_NAME" style="background-color: #F8F8F8" readonly="readonly"/>
                            </div>
                        </div>
                    </div>
                    
                    <div class="line">
                        <div class="line4 fl">
                            <div class='red fl hidden'>*&nbsp;</div>
                            <div class="apply-mail fl">邮&nbsp;&nbsp;&nbsp;&nbsp;箱：</div>
                            <div class="text1 fl"><input type='text' id="SUBMIT_STAFF_EMAIL" readonly="readonly"/></div>
                        </div>
                        <div class="line4 fr">
                            <div class='red fl'>*&nbsp;</div>
                            <div class="apply-tel fl">联系电话：</div>
                            <div class="text1 fl"><input type='text' id="SUBMIT_STAFF_MOBILE" readonly="readonly"/></div>
                        </div>
                    </div>
                    
                    <%--<div class="line display" >--%>
                    <div class="line display">
                        <div class="line4 fl" style="background-color: #F8F8F8">
                            <div class='red fl'>*&nbsp;</div>
                            <div class="apply-serial fl">工单编号：</div>
                            <div class="text1 fl"><input type='text' id="SERIAL_NO" style="background-color: #F8F8F8" readOnly='readonly'/></div>
                        </div>
                        <div class="line4 fr" style="background-color: #F8F8F8">
                            <div class='red fl'>*&nbsp;</div>
                            <div class="apply-time fl">填写时间：</div>
                            <div class="text1 fl"><input type='text' id="SUBMIT_TIME" style="background-color: #F8F8F8" readOnly='readonly'/></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="model" id="flowFlogDiv">
            <div class="model-head">
					<span class="img">
						<img id='process_but1' style="cursor:pointer;" title="收起"
                             src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_hidden.png")%>'
                             onclick="getObj('process').style.display='none';
								getObj('process_but2').style.display='block';this.style.display='none';"/>
						<img id='process_but2' style="display:none;cursor:pointer;" title="展开"
                             src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_open.png")%>'
                             onclick="getObj('process').style.display='block';
								getObj('process_but1').style.display='block';this.style.display='none';"/>
					</span>
                <span class="bold">处理过程</span>
            </div>
            <div class="content" style="padding-top:0px;" id="process">
                <div id="showPanel" class="divBox" style="background:#ffffff;text-align:left;width:100%">
                    <span id="chartShow" onclick="getProc(oForm)" onmouseover="this.style.color='#FF0000';"
                          style="margin-left:40px;cursor:hand;text-Decoration:underline;font-size:13px;color:#0046D5;"
                          onmouseout="this.style.color='#0046D5';"><font
                            style="font-family:Webdings;font-size:18px;">4</font> 图形风格展示</span>
                    <iframe src="about:blank" style="width: 100%; height: 100%; border: 0px solid black;
                    	overflow-y:none;" frameborder="0" id="oFlowProcFrame"></iframe>
                </div>
            </div>
        </div>
    </div>
</div>

<div>
    <div id="fieldset_01_Info" style="display:none">
        <form class='formsPanel_3'>
            <div>
                <div>
                    <label><font style="width:auto;color:#FFAE00;font-size:10px;font-family:'宋体';margin:2px 3px 0 0;">
                    	*</font>所在室审核：</label>
                    <span id="AUDIT_OPINION_1" onValueChange="oForm.execFlowUIHook()"></span>
                </div>
            </div>
        </form>
    </div>
</div>
</BODY>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/util/upload.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/encode/aes.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/encode/mode-ecb.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/Common.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/Dialog.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/Error.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/ChoiceDialog.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/jtitsmFormCommon.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/jtitsmFormCommon2.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/My97DatePicker/WdatePicker.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/assets/js/jquery-1.7.2.min.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/jqueryUI/ui/minified/jquery-ui.min.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/cloudApplyNew.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/workshop/form/table2.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/XML.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/XMLTree/XMLTree.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/XMLTree/XMLTreeAction.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/busiMonitor/Result.js")%>"></script>
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/resource/js/json2.js")%>'></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/leaveRecovery.js")%>"></script>
</HTML>