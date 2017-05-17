<%@page language="java" pageEncoding="GBK"%>
<%@page import="com.bsnnms.bean.common.resource.ResourceLoader"%>
<%@ page import="com.bsnnms.bean.common.HtmlUtils"%>
<jsp:useBean id="pubFun" scope="request" class="com.bsnnms.servlet.logicaudit.PubFun" />
<html xmlns:ie="">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" >
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>�����������̱�</title>
    <style type="text/css">
        @import url(<%=ResourceLoader.buildSrc("/resource/css/flow.css")%>);
        @import url(<%=ResourceLoader.buildSrc("/resource/css/publicCss.css")%>);
        @import url(<%=ResourceLoader.buildSrc("/resource/css/jtitsm/btn.css")%>);
        @import url(<%=ResourceLoader.buildSrc("/resource/css/jtitsm/table.css")%>);
        @import url(<%=ResourceLoader.buildSrc("/resource/css/jtitsm/page.css")%>);
        @import url(<%=ResourceLoader.buildSrc("/resource/css/blueForm.css")%>);
        @import url(<%=ResourceLoader.buildSrc("/resource/css/jtitsm/flowForm.css")%>);
        @import url(<%=ResourceLoader.buildSrc("/resource/js/ext/resources/css/ext-all.css")%>);
        body{margin-top:0px;background:#e5e9ec;margin-bottom:20px;}
        .xmlTable{behavior:url(<%=ResourceLoader.buildSrc("/resource/htc/table.htc")%>); cursor:hand;}
        .xmlTable input {border-width: 1px;}
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
			background: url('<%=ResourceLoader.buildSrc("/resource/js/showLoading/images/loading.gif")%>');
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
    </style>
</head>
<body>
<div id="hiddenDiv">
	<%=HtmlUtils.outHtmlData("visitType",pubFun.getCodeListSelect("CUST_JTITSM_DOMAIN_VISIT_TYPE","", ""))%>
	<%=HtmlUtils.outHtmlData("exitNetwork",pubFun.getCodeListSelect("CUST_JTITSM_DOMAIN_EXIT_NETWORK_TYPE","", ""))%>
	<%=HtmlUtils.outHtmlData("agreement",pubFun.getCodeListSelect("CUST_JTITSM_DOMAIN_AGREEMENT_TYPE","", ""))%>
</div>
<div id="mask_div" class="domainInfoCss"></div>
<div style="text-align:center;">
    <div class="divBox">
        <div>
            <div class="div_blue" style="width:1190px;">
                <span style="float:right;"><img id='apply_info_but1' src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_hidden.png")%>' style="cursor:pointer;" 
                	title="����" onclick="getObj('apply_info').style.display='none'; getObj('apply_info_but2').style.display='block';this.style.display='none';"> 
                	<img id='apply_info_but2' style="display:none;cursor:pointer;" title="չ��" 
                		src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_open.png")%>'
                		onclick="getObj('apply_info').style.display='block'; getObj('apply_info_but1').style.display='block';this.style.display='none';">
                </span> ��������
            </div>
            <div id="apply_info" class="divBlock">
                <table class="table">
                    <tr>
                        <td colspan="3" style="width:100%;" class="whiteBlock">
                            <div class="block_white">
                                <label for="TITLE">������⣺</label>
                                <input id="TITLE" style="line-height:14px;width:1050px;">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3" class="whiteBlock">
                            <div class="block_white">
                                <label style="float:left;" for="APPLY_DESC">��Ҫ˵����</label> 
                                <span id="APPLY_DESC_L" style="font-size:12px;padding-top:3px;width:1050px;display:none;"></span> 
                                <textarea id="APPLY_DESC"></textarea>
                            </div>
                        </td>
                    </tr>
                    <tr id="APPLY_USE_TR">
                        <td style="width:30%;" class="whiteBlock">
                            <div class="block_white">
                                <label for="APPLY_USE" style="display:bolck;float:left;line-height:36px;">������;��</label>
                                <span id="APPLY_USE_DIV" style="display:bolck;float:left;"></span>
                            </div>
                        </td>
                       <td colspan="2" style="width:60%;" class="whiteBlock">
                            <div class="block_white">
	                            <label for="USE_LIMIT_TIME" style="display:bolck;float:left;line-height:36px;">ʹ�����ޣ�</label>
	                            <span id="USE_LIMIT_TIME_DIV" style="display:bolck;float:left;"></span>
	                            
                            	<table id="DEAD_LINE_TABLE" style="display:none">
                            		<tr>
                            			<td>&nbsp;</td>
                            			<td>
                            				<label for="DEAD_LINE" style="display:bolck;float:left;line-height:36px;">��ֹ��������</label>
                            			</td>
                            			<td>
                            				 <input id='DEAD_LINE' onFocus="WdatePicker({isShowClear:true,dateFmt:'yyyy-MM-dd', readOnly:true})" 
                            				 	style="width:150px;border:1px solid #cccccc;height:30px;line-height:30px;text-align:center;" readonly="readonly"/>
                            				 <!-- 
                            					 <img src="/resource/image/jtitsm_cloud/m_g_calendar.png" onFocus="WdatePicker({isShowClear:true,dateFmt:'yyyy-MM-dd', readOnly:true})">
                            				 -->
                            			</td>
                            		</tr>
                            	</table>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div>
            <div class="div_blue" style="">
                <span style="float:right;">
                    <img id='apply_list_but1' src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_hidden.png")%>' 
                        style="cursor:pointer;" title="����" 
                        onclick="getObj('apply_list').style.display='none'; getObj('apply_list_but2').style.display='block';this.style.display='none';"> 
                    <img id='apply_list_but2' src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_open.png")%>' 
                        style="display:none;cursor:pointer;" title="չ��" 
                        onclick="getObj('apply_list').style.display='block'; getObj('apply_list_but1').style.display='block';this.style.display='none';">
                </span>���������б�
            </div>
			<form id="exportExcelForm" action="" method="post" target="downloadFrame">
			<input type="hidden" name="param"> 
            <input type="hidden" name="field"> 
            <input type="hidden" name="formFileName" id="formFileName">
            <div id="apply_list" class="divBlock">
        	<!-- domainDataList 4 �𵥻���ʹ��(���߻�������˻���[����иû��ڵĻ�]) -->
            <table id='domainDataList' style="display:none" class='tableCss'>
                <tr>
                    <td colspan="7" style="font-size:12px; font-weight:bold; text-align: left">
                        <span>
                        	<img id="excelImg" style="cursor:hand;" src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/excel-btn.png")%>' 
                        		onmouseover="getObj('excelImg').src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/excel-hover-btn.png")%>'" 
                        		onmouseout="getObj('excelImg').src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/excel-btn.png")%>'">
                        </span>
                         <span>
                        	<img id="importExcel" style="cursor:hand;" src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/excel-btn-im.png")%>' 
                        		onmouseover="getObj('importExcel').src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/excel-hover-btn-im.png")%>'" 
                        		onmouseout="getObj('importExcel').src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/excel-btn-im.png")%>'">
                        </span>
                    </td>
                    <td colspan="3" class='pageTdCss'></td>
                </tr>
                <tr class="tHeadCss">
                	<td>���</td>
                    <td>��������</td>
                    <td>��������</td>
                    <td>ԴӦ��ϵͳ</td>
                    <td>ԴIP��ַ</td>
                    <td>Դ�˿�</td>
                    <td>��������</td>
                    <td>��������IP��</td>
                    <td>����ǽ�˿�</td>
                    <td>Э��</td>
                    <td>����</td> <!-- [����||ɾ��] -->
                </tr>
            </table>
        	
        	<!-- domainCommonDataList ͨ�û��ڲ鿴�б����漰��ɾ�ģ� -->
            <table id='domainCommonDataList' style="display:none" class='tableCss'>
                <tr>
                    <td colspan="7" style="font-size:12px; font-weight:bold; text-align: left">
                        <span>
                        	<img id="excelImg1" style="cursor:hand;" src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/excel-btn.png")%>' 
                        		onmouseover="getObj('excelImg1').src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/excel-hover-btn.png")%>'" 
                        		onmouseout="getObj('excelImg1').src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/excel-btn.png")%>'">
                        </span>
                    </td>
                    <td colspan="3" class='pageTdCss'></td>
                </tr>
                <tr class="tHeadCss">
                	<td>���</td>
                    <td>��������</td>
                    <td>��������</td>
                    <td>ԴӦ��ϵͳ</td>
                    <td>ԴIP��ַ</td>
                    <td>Դ�˿�</td>
                    <td>��������</td>
                    <td>��������IP��</td>
                    <td>����ǽ�˿�</td>
                    <td>Э��</td>
                </tr>
            </table>
            
            <!-- ��Դ��ͨ�����б� -->
            <table id='domainOpenDataList' style="display:none" class='tableCss'>
                <tr>
                    <td colspan="9" style="font-size:12px; font-weight:bold; text-align: left;">
                    	<img id="excelImg2" style="cursor:hand;" src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/excel-btn.png")%>' 
                    		onmouseover="getObj('excelImg2').src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/excel-hover-btn.png")%>'" 
                    		onmouseout="getObj('excelImg2').src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/excel-btn.png")%>'">
                    	<img id="importExcel1" style="cursor:hand;" src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/excel-btn-im.png")%>' 
                    		onmouseover="getObj('importExcel1').src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/excel-hover-btn-im.png")%>'" 
                    		onmouseout="getObj('importExcel1').src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/excel-btn-im.png")%>'">
                    </td>
                    <td colspan="3" class='pageTdCss'></td>
                </tr>
                <tr class="tHeadCss">
                	<td>���</td>
                    <td>��������</td>
                    <td>��������</td>
                    <td>ԴӦ��ϵͳ</td>
                    <td>ԴIP��ַ</td>
                    <td>Դ�˿�</td>
                    <td>��������</td>
                    <td>��������IP��</td>
                    <td>����ǽ�˿�</td>
                    <td>Э��</td>
                    <td>��������</td>
                    <!--<td>����</td>  [�༭] -->
                </tr>
            </table>
            
            <!-- ��Դ��ͨ�����б� -->
            <table id='domainFinishDataList' style="display:none" class='tableCss'>
                <tr>
                    <td colspan="9" style="font-size:12px; font-weight:bold; text-align: left;">
                    	<span>
                    		<img id="excelImg3" style="cursor:hand;" src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/excel-btn.png")%>' 
                    			onmouseover="getObj('excelImg3').src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/excel-hover-btn.png")%>'" 
                    			onmouseout="getObj('excelImg3').src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/excel-btn.png")%>'">
                    	</span>
                    </td>
                    <td colspan="3" class='pageTdCss'></td>
                </tr>
                <tr class="tHeadCss">
                	<td>���</td>
                    <td>��������</td>
                    <td>��������</td>
                    <td>ԴӦ��ϵͳ</td>
                    <td>ԴIP��ַ</td>
                    <td>Դ�˿�</td>
                    <td>��������</td>
                    <td>��������IP��</td>
                    <td>����ǽ�˿�</td>
                    <td>Э��</td>
                    <td>��������</td>
                </tr>
            </table>         
                      
                                        
            <!-- (+)�Ű�ť -->
            <div class="addDivCss" id="addDomainInfoDiv" style="display:none" 
            	onmouseover="getObj('addImg1').src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/add_o.png")%>'" 
            	onmouseout="getObj('addImg1').src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/add_b.png")%>'">
                <img id="addImg1" src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/add_b.png")%>'>
            </div>
                
            </div>
          </form>
        </div>
        <div>
            <div class="div_blue">
                <span style="float:right;">
                	<img id='staff_info_but1' style="cursor:pointer;" title="����" 
                		src="<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_hidden.png")%>" 
                		onclick="getObj('staff_info').style.display='none'; getObj('staff_info_but2').style.display='block';this.style.display='none';"> 
                	<img id='staff_info_but2' style="display:none;cursor:pointer;" title="չ��" 
                		src="<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_open.png")%>" 
                		onclick="getObj('staff_info').style.display='block'; getObj('staff_info_but1').style.display='block';this.style.display='none';">
                </span>��������Ϣ
            </div>
            <div id="staff_info" class="divBlock">
                <table class="table">
                    <tr>
                        <td style="width:50%;" class="disabledBlock">
                            <div class="block_white">
                                <label for="APPLY_STAFF_NAME">
                                	<img src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_b_user.png")%>'>����ˣ�</label> 
                                <input id="APPLY_STAFF_NAME" readonly="readonly" />
                            </div>
                        </td>
                        <td style="width:50%;padding-left:10px;" class="disabledBlock">
                            <div class="block_white">
                                <label for="APPLY_ORG_NAME">
                                	<img src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_g_department.png")%>'>���벿�ţ�</label> 
                                <input id="APPLY_ORG_NAME" readonly="readonly" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="width:50%;" class="whiteBlock">
                            <div class="block_white">
                                <label for="APPLY_MAIL">
                                	<img src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_b_mail.png")%>'>��&nbsp;&nbsp;&nbsp;&nbsp;�䣺</label> 
                                <input id="APPLY_MAIL" />
                            </div>
                        </td>
                        <td style="width:50%;padding-left:10px;" class="whiteBlock">
                            <div class="block_white">
                                <label for="APPLY_TEL">
                                	<img src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_b_phone.png")%>'>��ϵ�绰��</label> 
                                <input id="APPLY_TEL" />
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        
        
        <!-- ������ -->
        
         <div id="APPLY_INFO_SHOW_DIV" style="width:1250px;display:none;">
            <div class="floatTitleDiv" id="moveDiv" onmousedown="dragOper(this.parentElement)">
		        <span class="floatCloseBut"
		            onclick="this.parentElement.parentElement.style.display = 'none';getObj('mask_div').style.display='none';document.body.style.overflow = 'auto';" title="�ر�">
		            <img src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/close.png")%>'>
		        </span>
		        <span class="floatTitle">�����������</span>
	   		</div>
            <div id="APPLY_INFO_DIV" class="divBlock">
            	<input id="DOMAIN_REQUEST_ID" type="hidden">
                <table class="table">
                    <tr>
                        <td style="width:30%;" class="disabledBlock">
                            <div class="domain_block_white">
                                <label for="VISIT_TYPE"><font class="domain_block_must_fill">*</font>�������ͣ�</label> 
                                <select id="VISIT_TYPE">
                                </select>
                                
                            </div>
                        </td>
                        <td style="width:30%;padding-left:10px;" class="disabledBlock">
                            <div class="domain_block_white">
                                <label for="EXIT_NETWORK"><font class="domain_block_must_fill">*</font>�������磺</label> 
                                <select id="EXIT_NETWORK">
                                </select>
                            </div>
                        </td>
                         <td style="width:30%;padding-left:10px;" class="disabledBlock">
                            <div class="domain_block_white">
                                <label for="SOURCE_APP_SYSTEM"><font class="domain_block_must_fill">*</font>
                                	<font onClick="NetWorkBelongSystems.show();" title="ѡ��ϵͳ" class="domainLabelLink" 
                                		onMouseOver="this.className='domainLabelLinkOver'" onMouseOut="this.className='domainLabelLink'">
                                        	ԴӦ��ϵͳ��
                                	</font>
                                </label> 
                                <input id="SOURCE_APP_SYSTEM" readonly="readonly"/>
                                <input id="SOURCE_APP_SYSTEM_IDS" type="hidden"/>
                                <input id="SOURCE_APP_BPR" type="hidden"/>
                            </div>
                        </td>
                    </tr>
                    
                    <tr>
                        <td style="width:30%;" class="disabledBlock">
                            <div class="domain_block_white">
                                <label for="SOURCE_IP"><font class="domain_block_must_fill">*</font>ԴIP��</label> 
                                <input id="SOURCE_IP" />
                            </div>
                        </td>
                        <td style="width:30%;padding-left:10px;" class="disabledBlock">
                            <div class="domain_block_white">
                                <label for="SOURCE_PORT">Դ�˿ڣ�</label> 
                                <input id="SOURCE_PORT" />
                            </div>
                        </td>
                         <td style="width:30%;padding-left:10px;" class="disabledBlock">
                            <div class="domain_block_white">
                                <label for="APPLY_DOMAIN">
                                	 �������룺
                                </label> 
                                <input id="APPLY_DOMAIN" />
                            </div>
                        </td>
                    </tr>
                    
                    <tr>
                        <td style="width:30%;" class="disabledBlock">
                            <div class="domain_block_white">
                                <label for="VISIT_DOMAIN_IP">��������IP�Σ�</label> 
                                <input id="VISIT_DOMAIN_IP" />
                            </div>
                        </td>
                        <td style="width:30%;padding-left:10px;" class="disabledBlock">
                            <div class="domain_block_white">
                                <label for="FIREWALL_PORT">����ǽ�˿ڣ�</label> 
                                <input id="FIREWALL_PORT" />
                            </div>
                        </td>
                         <td style="width:30%;padding-left:10px;" class="disabledBlock">
                            <div class="domain_block_white">
                                <label for="AGREEMENT"><font class="domain_block_must_fill">*</font>Э�飺</label> 
                                <select id="AGREEMENT">
                                </select>
                            </div>
                        </td>
                    </tr>
                    
                    <tr id="DISTRIBUTE_DOMAIN_TR" style="display:none">
                        <td style="width:30%;" class="disabledBlock">
                            <div class="domain_block_white">
                                <label for="DISTRIBUTE_DOMAIN"><font class="domain_block_must_fill">*</font>����������</label> 
                                <input id="DISTRIBUTE_DOMAIN" />
                            </div>
                        </td>
                        <td style="width:30%;padding-left:10px;" class="disabledBlock">
                            &nbsp;
                        </td>
                         <td style="width:30%;padding-left:10px;" class="disabledBlock">
                            &nbsp;
                        </td>
                    </tr>
                </table>
                <div style="width:1000px;padding-top:20px;">
                	    <span id="addDomainSureBtn_span" style='text-align:center;'>
					        <input id='addDomainSureBtn' class="btn_blue" type="button" style="width: 80px;"
					            value="��&nbsp;&nbsp;��"/> 
					    </span>
					    &nbsp;&nbsp;
					    <span id="resetDomainBtn_span" style='text-align:center;'>
					        <input id='resetDomainBtn' class="btn_blue" type="button" style="width: 80px;" 
					            value="��&nbsp;&nbsp;��"/> 
					    </span>&nbsp;&nbsp;
					
					    <span id="updateDomainBtn_span" style='text-align:center;'>
					        <input id='updateDomainBtn' class="btn_blue" type="button" style="width: 80px;" 
					            value="ȷ&nbsp;&nbsp;��"/> 
					    </span>&nbsp;&nbsp;
					    <span style='text-align:center;'>
					        <input id='addDomainCancelBtn' class="btn_blue" type="button" style="width: 80px" 
					            value="ȡ&nbsp;&nbsp;��"/> 
					    </span>
                </div>
            </div>
        </div>
    </div>
    
     <!-- ϵͳѡ�� -->
    <div id="APPLY_SYSTEM_SHOW_DIV" style="width:800px;display:none;">
    	 <div class="floatTitleDiv" >
		    <span class="floatTitle">ҵ��ϵͳѡ��</span>
	   	</div>
    	<div class="domain_block_white" style="height:450px;overflow: auto;">
    		<div>
        		<label for="BELONG_PROFESSION" style="padding: 8px 10px; text-align: left;">����רҵ��</label> 
     	   		<div id="BELONG_PROFESSION" style="margin:5px 20px 5px 10px;"></div>
    		</div>
        	<div >
            	<label for="BELONG_SYSTEMS" style="padding: 8px 10px; text-align: left;">����ϵͳ��</label>
            	<div id="BELONG_SYSTEMS" style="margin:5px 20px 5px 10px;"></div>
        	</div>
    	</div>
    	<div style="width:100%;padding-top:20px;" id="APPLY_SYSTEM_BUTTONS">
		    <span style='text-align:center;' id="saveSysSpan">
		        <input id='saveSysBtn' class="btn_blue" type="button" style="width: 80px;" 
		            value="ȷ&nbsp;&nbsp;��"/> 
		    </span>&nbsp;&nbsp;
		    <span style='text-align:center;' id="cancelSysSpan">
		        <input id='cancelSysBtn' class="btn_blue" type="button" style="width: 80px" 
		            value="ȡ&nbsp;&nbsp;��"/> 
		    </span>
        </div>
    </div>
    
    <div id="flowFlogDiv" style="width:1190px;display:none;">
        <div class="div_blue" style="width:1190px;">
            <span style="float:right;">
            	<img id='flow_Flog_but1' style="cursor:pointer;" title="����" 
            		src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_hidden.png")%>' 
            		onclick="getObj('showPanel').style.display='none'; getObj('flow_Flog_but2').style.display='block';this.style.display='none';"> 
            		<img id='flow_Flog_but2' style="display:none;cursor:pointer;" title="չ��" 
            			src='<%=ResourceLoader.buildSrc("/resource/image/jtitsm_cloud/m_open.png")%>' 
            			onclick="getObj('showPanel').style.display='block'; getObj('flow_Flog_but1').style.display='block';this.style.display='none';"></span> �������
        </div>
        <!--�������(�б�ʽ): -->
        <div id="showPanel" class="divBox" style="background:#ffffff;text-align:left;">
            <span id="chartShow" style="margin-left:40px;cursor:hand;text-Decoration:underline;font-size:13px;color:#0046D5;" 
            	onclick="getProc(oForm)" onmouseover="this.style.color='#FF0000';" onmouseout="this.style.color='#0046D5';">
            	<font style="font-family:Webdings;font-size:18px;">4</font> ͼ�η��չʾ</span> 
            	<iframe src="about:blank" style="width: 100%; height: 100%; border: 0px solid black;overflow-y:none;" 
            		frameborder="0" id="oFlowProcFrame"></iframe>
        </div>
    </div>
    
    <div class="errorDivCss" id="error_div"></div>
    <div style="display: none" id="hiddenDiv">
        <input type="hidden" id="FLOW_ID"> 
        <input type="hidden" id="REQUEST_ID"> 
        <input type="hidden" id="APPLY_USE"> 
        <input type="hidden" id="USE_LIMIT_TIME"> 
        <input type="hidden" id="APPLY_STAFF_ID"> 
        <input type="hidden" id="APPLY_DATE"> 
        <input type="hidden" id="APPLY_ORG_ID"> 
        <input type="hidden" id="SERIAL"> 
    </div>
</div>
<iframe name="downloadFrame" style="display:none"></iframe>
</body>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/Common.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/Dialog.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/Error.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/ChoiceDialog.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/workshop/form/table2.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/jtitsmFormCommon.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/jtitsmFormCommon2.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/My97DatePicker/WdatePicker.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/jQuery/jquery-1.8.3.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/showLoading/jquery.showLoading.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/domainApply.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/XML.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/XMLTree/XMLTree.js")%>"></script>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/XMLTree/XMLTreeAction.js")%>"></script>
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/resource/js/ext/adapter/ext/ext-base.js")%>'></script> 
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/resource/js/ext/ext-all.js")%>'></script>
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/resource/js/ext/src/locale/ext-lang-zh_CN.js")%>' charset="utf-8"></script>
</html>