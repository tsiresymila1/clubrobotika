const PDFDocument = require('pdfkit');
const fs = require('fs');
import path from 'path';
module.exports = (res,user,qrcode,callback) =>{

    const doc = new PDFDocument({
        layout: 'landscape',
        bufferPages: true,
        size: [189,340],
    });
    var pdfpath = 'badge.pdf';
    var stream = fs.createWriteStream(pdfpath);
    doc.pipe(stream);

    doc.rect(0, 0, doc.page.width, doc.page.height).fillColor('#ffffff', 0.1).fill();
    
    doc.image(path.join(__dirname,'/../public/assets/robot2.png'), 70,0, 
    {
        fit: [189, 340],
        align: 'center',
        
    });

    var grad = doc.linearGradient(170, 0, 170, 20);
    grad.stop(0, '#8A0D06');
    grad.stop(1, '#940707');
    doc.fillColor(grad);

    doc.rect(0, 0, doc.page.width, 25).fillColor('#fff', 1).fill(grad);
    doc.fill('#F6F6F6');
    doc.fontSize(9);
    doc.font(__dirname+'/../public/fonts/ABeeZee-Regular.ttf')
    .text('CLUB ROBOTIKA MADAGASCAR',0,3,{
        width :340,
        align : 'center'
    })
    .text('C.R.M',0,12,{
    width :340,
    align : 'center'
    });  
    // NOm
    doc.fontSize(9)
    .fill('#161616')
    .text("Nom : ",20,60,{
    width :60,
    })
    .text(user.name,80,60,{
    width :195,
    });
    // Prénom
    doc.fontSize(9)
    .fill('#161616')
    .text("Prénom : ",20,75,{
    width :60,
    })
    .text(user.lastname,80,75,{
    width :195,
    });
    // Matricule
    doc.fontSize(9)
    .fill('#161616')
    .text("Matricule : ",20,90,{
    width :60,
    })
    .text(user.matricule,80,90,{ 
    width :105,
    });
    
    // Categorie
    
    doc.fontSize(9)
    .fill('#161616')
    .text("Categorie : ",20,105,{
    width :60,
    })
    .text(user.category,80,105,{
    width :105,
    });
    
    doc.fontSize(20).
    text("COACH",125,150,{
    width :80,
    height:10,
    align: 'center'
    });
    // doc.fontSize(9);
    // // Using a standard PDF font
    // logo
    doc.image(
        __dirname+'/../public/assets/logo.png', 265,
    40, 
    {
        fit: [60, 60],
        align: 'center',
        }
    );
    // petit robot
    doc.image(
        __dirname+'/../public/assets/robot.jpg', 20,
    125, 
    {
        fit: [60, 60],
        align: 'center',
        }
    );
    // photo
    doc.image(
    __dirname + '/../public/assets/profile/'+user.image, 265,
    110, 
    {
        fit: [60, 60],
        align: 'center',
        }
    );
    // FOoter
    var grad2 = doc.linearGradient(170, 0, 170, 20);
    grad2.stop(0, '#95102D');
    grad2.stop(1, '#9E0E0E');
    doc.fillColor(grad2);
    doc.rect(0, doc.page.height -10, doc.page.width, 10).fill(grad2);
    doc.fill('#FFFFFF')
    .fontSize(5)
    .text('Date d\'expiration : 06-12-2021',6,181,{
    width :340,
    height:6,
    align : 'left'
    });
    
    doc.addPage();
    doc.image(
    qrcode, 120,
    45, 
    {
        fit: [100, 100],
        align: 'center',
        }
    );
    var filename = user.id+'_'+user.lastname.split(' ').join('_')+'_'+user.name.split(' ').join('-')+'.pdf';
    var stream = res.writeHead(200,{
        'Content-Type' : "application/pdf",
        'Content-Disposition':'filename='+filename
    });
    doc.on('data', (chunk)=>stream.write(chunk));
    doc.on('end', ()=>stream.end());
    doc.end();
};

