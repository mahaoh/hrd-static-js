/**
 * 外部信息
 */
//mediav	
try{
	var _mvq = _mvq || [];
	_mvq.push(['$setAccount', 'm-28241-0']); 
	_mvq.push(['$setGeneral', 'ordercreate', '', /*用户名*/ '', /*用户id*/ _hrduid]);
	_mvq.push(['$logConversion']);	
	_mvq.push(['$addOrder',tend_ids_mediva, tend_account_mediva]);
	_mvq.push(['$logData']);
}catch(e) {
}
