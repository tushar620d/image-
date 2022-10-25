const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const img = new Image();
const reader = new FileReader();

function uploadimage(e)
{
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
        img.src = reader.result;
        img.onload = () => {
            canvas.height = img.height;
             canvas.width = img.width ;
            ctx.drawImage(img , 0 , 0 );
            
         };
        
    };         
}

function Change_sepia()
{
    const imagedata = ctx.getImageData(0 , 0 , canvas.width , canvas.height);
    const data = imagedata.data;
    for(let i = 0 ; i < data.length ; i+=4)
    { 
       const value = data[i]*0.21 + data[i+1]*0.73 + data[i+2]*0.1;   
       data[i] = value + 95;
       data[i+1] =value + 58;
       data[i+2] = value;
    }
    ctx.putImageData(imagedata , 0, 0);
}

// greyscale 
function Change_greyscale()
{
    const imagedata = ctx.getImageData(0 , 0 , canvas.width , canvas.height);
    const data = imagedata.data;
    for(let i = 0 ; i < data.length ; i+=4)
    { 
       const value = data[i]*0.21 + data[i+1]*0.73 + data[i+2]*0.1;   
       data[i] = value;
       data[i+1] =value;
       data[i+2] = value;
    }
    ctx.putImageData(imagedata , 0, 0);
}

 // breaking screen 
function Change_breaking()
{
    const imagedata = ctx.getImageData(0 , 0 , canvas.width , canvas.height);
    const data = imagedata.data;
    let val = true;
    let total = data.length ;
    let width = canvas.width ;
    width *= 4 ;
    let change_pt = (canvas.height/2) * width;
    let value = width/2 ;
    for(let i = 0 ; i < data.length ; i+=4)
    { 
        let cnt = width/500 , cc = 0 ;
       for( let j = i  ; j < i + value ; j += 4)
       {
           for( let k = j; k < j + cnt ; k+=4 )
           {
             data[Math.floor(k+3)] = cc;
           }
            cc++;
            j += cnt-4;
       }
    // data[i+3] = 0;
       value -=1;
       if(i <= change_pt )
       {
          value -= 2 ; 
       }
       else value+=2; 
       i += (width-4); 
    }
   
    
    ctx.putImageData(imagedata , 0, 0);
}
// lining effect 
function Change_lining()
{
    const imagedata = ctx.getImageData(0 , 0 , canvas.width , canvas.height);
    const data = imagedata.data;
    let val = true;
    let total = data.length ;
    let width = canvas.width ;
    width *= 4 ;
    let change_pt = (canvas.height/2) * width;

    let value = width/2 ;
    for(let i = 0 ; i < data.length ; i+=4)
    { 
        let cnt = width/500 , cc = 0 ;
       for( let j = i  ; j < i + width ; j += 4)
       {
           for( let k = j; k < j + cnt ; k+=4 )
           {
               
             data[k+3 | 0] = 0;  
           }
            cc++;
            j += 4*cnt-4;
       }
       i += (width-4); 
    }
   
    ctx.putImageData(imagedata , 0, 0);
}
  // to blur the image 
  function Change_blur()
{
    const imagedata = ctx.getImageData(0 , 0 , canvas.width , canvas.height);
    const data = imagedata.data;
    console.log(typeof data);
    const data2 = [];
    let val = true;
    let total = data.length ;
    let width = canvas.width ;
    width *= 4 ;
    for(let i = 0 ; i < data.length ; i+=4)
    {
       let value = 0 ;
         for(let  j = 0 ; j < 3 ; j++)
         {
             if(i-width-4 >= 0)  value += data[i-width-4+j];
             if(i-width >= 0)    value += data[i-width+j];
             if(i-width+4 >= 0)  value += data[i-width+4+j];

             if(i-4 >= 0)  value += data[i-4+j];
                value += data[i+j];
             if(i+4 <  total)  value += data[i+4+j];
             
             if(i+width-4 < data.length)  value += data[i+width-4+j];
             if(i+width  < data.length)    value += data[i+width+j];
             if(i+width+4 < data.length)  value += data[i+width+4+j];
             
            //  value = 0 ;
            value = value/6;
             data2[i+j] = value;
             value = 0 ;
         }

         data2[i+3] = 255;

    }
   
    for(let i = 0 ; i < data.length ; i++)
    {
      data[i] = data2[i] ;  
    }
    
    ctx.putImageData(imagedata , 0, 0);
}


  // to reflect the image 
function Change_reflect()
{
    const imagedata = ctx.getImageData(0 , 0 , canvas.width , canvas.height);
    const data = imagedata.data;
    let val = true;
    let total = data.length ;
    let width = canvas.width ;
    width *= 4 ;
    for(let i = 0 ; i < data.length ; i+=4)
    {
       let row = Math.floor(i/width) ;
       let pos = i%width ;
       let last = width*row + width ;
       if(pos >= width/2)
      {
           i = last-4 ;
           continue;
       }
        total = last - pos ;
         for(let  j = 0 ; j <= 3 ; j++)
         {
             let temp = data[total-4+j];
             data[total - 4 +j ] = data[i+j];
             data[i+j] = temp;
         }
  
        }
    
    ctx.putImageData(imagedata , 0, 0);
}



//   to invert the image
function Change_invert()
{
    
    const imagedata = ctx.getImageData(0 , 0 , canvas.width , canvas.height);
    const data = imagedata.data;
    let val = true;
    let total = data.length ;
    for(let i = 0 ; i < data.length/2 ; i+=4)
    {
         for(let  j = 0 ; j <= 3 ; j++)
         {
             let temp = data[total-i-4+j];
             data[total - 4 - i+j ] = data[i+j];
             data[i+j] = temp;
         }
    }
    
    ctx.putImageData(imagedata , 0, 0);
}

function Change_clear()
{
    img.src = reader.result;
}

function download()
{
    const image = canvas.toDataURL();
    const link  = document.createElement('a');
    link.href  = image ;
    link.download = "image.png";
    link.click();
}
document.querySelectorAll('button')[0].addEventListener("click" , Change_invert);
document.querySelectorAll('button')[1].addEventListener("click" , Change_lining);
document.querySelectorAll('button')[2].addEventListener("click" , Change_sepia);
document.querySelectorAll('button')[3].addEventListener("click" , Change_reflect);
document.querySelectorAll('button')[4].addEventListener("click" , Change_blur);
document.querySelectorAll('button')[5].addEventListener("click" , Change_greyscale);
document.querySelectorAll('button')[6].addEventListener("click" , Change_breaking);
document.querySelectorAll('button')[7].addEventListener("click" , Change_clear);
document.querySelectorAll('button')[8].addEventListener("click" , download);


const imgloader= document.getElementById("upload");
imgloader.addEventListener("change" , uploadimage);