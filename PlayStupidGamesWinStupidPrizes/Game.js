// Importing necessary modules
import * as THREE from '/build/three.module.js';
import {OrbitControls} from '/jsm/controls/OrbitControls.js';

//Creating a scene
var scene = new THREE.Scene();

//Initialising a camera and setting it up
var camera = new THREE.PerspectiveCamera (75, window.innerWidth/window.innerHeight, 0.1, 10000);
scene.add(camera);
camera.position.set(-350,350,300);

//Initialising a renderer and setting it up
var renderer = new THREE.WebGLRenderer ();
renderer.setSize (window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//EventListener for resizing
window.addEventListener('resize', ()=>{window.location.reload()});

//Adding controls for user interaction
var controls = new OrbitControls(camera, renderer.domElement);

//creating lights
const light_upleft = new THREE.PointLight( 0xffffff, 8, 4000 );
light_upleft.position.set(-450,-500,500);
scene.add( light_upleft );
const light_upright = new THREE.PointLight( 0xffffff, 8, 4000 );
light_upright.position.set(450,500,-500);
scene.add( light_upright );
const light_down = new THREE.PointLight( 0xffffff, 4, 4000 );
light_down.position.set(0,500,0);
scene.add( light_down );

//creating base
function base(){
    var geometry_base = new THREE.BoxGeometry(120, 20,170);
    var material_base = new THREE.MeshStandardMaterial({color:0x3412F3});
    var base = new THREE.Mesh (geometry_base, material_base);
    base.position.set(0,0,0)
    scene.add(base);

}

var game = true;
var score = 0;
var breadth=170; 
var creator = true;
var movement = false;
var clicked=false;
var lowercenter= 0;
var lowerbreadth=170;

//creating  moving box
function box_create(){
    var geometry_box = new THREE.BoxGeometry(120, 20,breadth);
    var material_box = new THREE.MeshStandardMaterial({color:0x3412A3});
    window.box = new THREE.Mesh(geometry_box, material_box);
    box.position.set(0,20*(score+1),-170);
    score+=1;
    scene.add(box);    
    
}

//creating still box
function stillbox(){
    var geometry_box2 = new THREE.BoxGeometry(120, 20,lowerbreadth);
    var material_box2 = new THREE.MeshStandardMaterial({color:0x3412A3});
    window.box2 = new THREE.Mesh(geometry_box2, material_box2);
    box2.position.set(0,20*(score),lowercenter);
    scene.add(box2);  
    
}

//creating box movement
function box_front(box1){
    
    box1.position.z+= 1;
    
    if(box1.position.z==170){
        end=2;
    }
}
function box_back(box1){
    
    box1.position.z-= 1;
    
    if(box1.position.z==-170){
        end=1;
    }
}
var end=1;
window.box_movement= function(box1){
   
    if(end==1){
        box_front(box1);
        

    }
    else if(end==2){
        box_back(box1);
        
    }
    
};

function animate(){
    
    if(game==true){
        base();
        document.getElementById('div1').style.display = 'block';
        document.getElementById('score').style.display = 'block';
        document.getElementById('border').style.display = 'block';
        if(creator == true){
            box_create();
            creator = false;
            movement = true;
        }
        if(movement == true){
            box_movement(box);   
        }
        //click function to play the game   
        document.addEventListener("click", ()=>{clicked=true});
        if(clicked==true){
            movement = false;
            var center = box.position.z;
            var upperend1=center-(breadth/2);
            var upperend2=center+(breadth/2);
            if((center-lowercenter)>0){
                var lowerend1=lowercenter-(lowerbreadth/2);
                var lowerend2=lowercenter+(lowerbreadth/2);
                //Breadth of the still box and the next moving box
                lowerbreadth=(lowerend2)-(upperend1);
                if(lowerbreadth>0){
                    lowercenter=lowerend2-(lowerbreadth/2);
                    breadth=lowerbreadth;
                    stillbox();
                    scene.remove(box);
                    creator = true;
                    end = 1;
    
                }
                //game over if the stillbox breadth is 0 or negative
                else{
                    scene.remove(box);
                    game=false;
                }
    
            }
            else if((center-lowercenter)<0){
                var lowerend2=lowercenter+(lowerbreadth/2);
                var lowerend1=lowercenter-(lowerbreadth/2);
                lowerbreadth=(upperend2)-(lowerend1);
                if(lowerbreadth>0){
                    lowercenter=lowerend1+(lowerbreadth/2);
                    breadth=lowerbreadth;
                    stillbox();
                    scene.remove(box);
                    creator = true;
                    end = 1;
    
                }
                else{
                    scene.remove(box);
                    game=false;
                }
    
    
                
            }
            else{
                stillbox();
                scene.remove(box);
                creator = true;
                end = 1;
    
            }
            document.getElementById("score").innerHTML= (score);
            clicked = false;
    }

    }

    if(game==false){
        document.getElementById("fs").innerHTML= (score);
        document.getElementById("finalscore").style.display = 'block';
        document.getElementById("fs").style.display = 'block';
        document.getElementById("fscore").style.display = 'block';
        document.getElementById('div1').style.display = 'none';
        document.getElementById('score').style.display = 'none';
        document.getElementById('border').style.display = 'none';

        
    }   


    //Updating the renderer
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}
animate();
