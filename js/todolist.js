
	window.onload = function()
	{	
		var Todo = localStorage.getItem('Todo');
		if(Todo)
			localStorage.setItem('Todo','');
		var Index = localStorage.getItem('Index');
		if(Index)
			localStorage.setItem('Index','');
		var newindex=[];
	
		newindex= Index.split('%');
		newindex.pop();		
		showlist();
		for (var i = 0; i<newindex.length; i++) {
				var c = document.getElementById(newindex[i]);
				c.id = newindex[i].concat('c');	
				c.style.textDecoration = "line-through";												
			}
		

	}

	function deletechecked()	
	{
		var Index = localStorage.getItem('Index');
		var Todolist = localStorage.getItem('Todo');
		var index = Index.split('%');		
		var list = Todolist.split('`');
		list.pop();
		index.pop();
		for(var i=index.length-1;i>=0;i--)
		{
			list.splice(index[i],1);
		}
		var newlist = '';
		for (var i = 0; i<list.length; i++) {

				newlist+=list[i]+'`';
			}
		localStorage.setItem('Todo',newlist);
		localStorage.setItem('Index','');

	}
	
	function add(){
		var input= document.getElementById("input").value;
		var Todolist='';
		if(input=='')
		{
			window.alert("Don't You Wanna Do Something");
		}
		else
		{
		Todolist=localStorage.getItem('Todo');
		Todolist+=input+'`';
		localStorage.setItem('Todo',Todolist);	
		}		

		showlist();
	}

	function showlist()
	{
		var x = document.createElement("div");
		x.id = 'todolist';
		document.body.appendChild(x); 
		Todolist=localStorage.getItem('Todo');
		var list;
		if(!Todolist)
			Todolist='';
		 list= Todolist.split('`');
       		 for (var i = list.length - 1; i >= 0; i--) {
        	if(list[i] != ''){
        	var c = document.createElement("button");
          	c.id =i;
          	c.setAttribute("onclick","set(this.id)");
          	c.setAttribute("class","todolistbuttons")
        	var t = document.createTextNode(list[i]);
        	c.appendChild(t);
        	b=document.createElement("br");
        	document.getElementById("todolist").appendChild(c);  
        	document.getElementById("todolist").appendChild(b);     	
       		 }
        }
        
	}

	function set(clicked_id)
	{		
		if(clicked_id.endsWith("c"))
		{
			unlock(clicked_id);
		}
		else
		{
			lock(clicked_id);
		}	
	}
	
	function unlock(clicked_id)
		{
			var c = document.getElementById(clicked_id);
			c.id = clicked_id.substring(0,clicked_id.length-1);
			c.style.textDecoration = "none";
			var Index = localStorage.getItem('Index');
			var pos = Index.indexOf(c.id);
			var newindex = Index.substring(0,pos)+Index.substring(pos+clicked_id.length,Index.length);
			localStorage.setItem('Index',newindex);	
			c.style.backgroundColor="#6177b6";
		}

	function lock(clicked_id)
		{
			var c = document.getElementById(clicked_id);
			var Index = localStorage.getItem('Index');
			var newindex=[];
			if(Index!='')
			newindex= Index.split('%');
			newindex.pop();
			newindex.push(c.id);			
			newindex.sort();
			Index='';
			for (var i = 0; i<newindex.length; i++) {
				
					Index+=newindex[i]+'%';									
			}
			localStorage.setItem('Index',Index);
			c.id = clicked_id.concat('c');
			c.style.textDecoration = "line-through";
			c.style.backgroundColor="#8495c6";
		}	

	function deleteall()
	{
		if(confirm("Do You Really Want to Wipe All Data!!!")==true)
		{
		localStorage.clear();
		localStorage.setItem('Todo','');
		localStorage.setItem('Index','');
		}
	}
