

<style>
	
	#questions-page{		
		color: white;			
	}
	
	#questions-page-title{
		font-family: kidzania;	
		font-size: 50px;
	}
	
	.questions-button{
		width: 100%;
		height: 60px;
		border: 0;
		background: white;
		color: rgb(30,30,30);
		font-size: 18px;
		margin-top: 5px;
		-webkit-border-radius: 8px;
		-moz-border-radius: 8px;
		border-radius: 8px;

		
	}
	.questions-button:active, .questions-button:hover {
		background: rgb(79,161,222);
	}
	

</style>

<?php
	$id_question = 1;
	if (isset($_GET["id_question"])){  
		$id_question = $_GET["id_question"];
	}
	
	$colors = array(
		"0",
		"#1359E0",
		"#41C01F",
		"#F0CC00",		
		"#F53300",	
		"#9E48AB"
		
	);
	
	$data = array(
		"1" => "¿Qué color te gusta más?",
		"1_num" => 4,
			"1.1" => "Azul",
			"1.2" => "Verde",
			"1.3" => "Amarillo",
			"1.4" => "Rojo",		
		"2" => "¿Cuántos años tienes?",
		"2_num" => 5,
			"2.1" => "Menos de 6",
			"2.2" => "7-8",
			"2.3" => "9-11",
			"2.4" => "11-13",
			"2.5" => "Más de 13",		
		"3" => "¿Eres...?",
		"3_num" => 2,
			"3.1" => "Niño",
			"3.2" => "Niña",
		"4" => "¿Qué animal te gusta más?",
		"4_num" => 5,
			"4.1" => "Perro",
			"4.2" => "Gato",
			"4.3" => "Elefante",
			"4.4" => "León",
			"4.5" => "Jirafa",
		"5" => "¿Qué superpoder te gustaría tener?",
		"5_num" => 4,
			"5.1" => "Volar",
			"5.2" => "Super-fuerza",
			"5.3" => "Invisibilidad",
			"5.4" => "Super-listo",			
		"6" => "¿Cuántas veces has venido a Kidzania?",
		"6_num" => 4,
			"6.1" => "Es la primera",
			"6.2" => "2 veces",
			"6.3" => "3 veces",
			"6.4" => "Más veces ;D",
			
		"7" => "¿Qué pelicula te gusta más?",
		"7_num" => 5,
			"7.1" => "Rey León",
			"7.2" => "Wall-e",
			"7.3" => "Buscando a nemo",
			"7.4" => "Shrek",
			"7.5" => "La era de hielo"
		
	);
	$num_preguntas = 7;
	
	echo "
		<script>
			function send_answer(id_answer){
				set_answer($id_question,id_answer);
				if ($id_question < $num_preguntas){
					load_page(\"questions-page.php?id_question=".($id_question+1)."\");
				}else{
					load_page(\"start-tutorial-page.html\")			 
				}
				
			}
		</script>
	";
	


?>

<div id="questions-page" class="container-pages">
	<span id="questions-page-title"><?php echo $data[$id_question]; ?></span><br/><br/>
	<?php
		$num_respuestas = $data[$id_question."_num"];
		for ($i = 1; $i <= $num_respuestas; $i++){
			echo "<input type=\"button\" class=\"questions-button\" value=\"".$data[$id_question.".".$i]."\"
						style=\"border-left: 7px solid ".$colors[$i]."\"
						onclick=send_answer(".$i.")> <br/>";
		}
	?>
	
	
</div>
