let parinte = document.querySelector('.tabla');

//punem random cartile
let poze = ['Images/vvd.jpg', 'Images/sm.jpg', 'Images/ms.jpg', 'Images/rf.jpg', 
            'Images/aoc.jpg', 'Images/gw.jpg', 'Images/taa.jpg', 'Images/jh.jpg'];
//Matrice pt url poze
//facere
let matPoze = [];
for(let i = 0; i < 4; i++) {
    let v = [];
    matPoze.push( v );
}
for(let i = 0; i < 4; i++)
    for(let j = 0; j < 4; j++)
        matPoze[i][j] = 'liber';

let rand;
let coloana;
//umplere matPoze
for(let j = 0; j < 2; j++) {
    for(let pic of poze) {

        do {
            rand = Math.floor( Math.random() * 4 );
            coloana = Math.floor( Math.random() * 4 );
        }while( matPoze[rand][coloana] != 'liber' );
    
        matPoze[rand][coloana] = pic;
    }
}

//Matrice pt carti:
//facere
let mat = [];
for(let i = 0; i < 4; i++) {
    let v = [];
    mat.push( v );
}

//umplere
let cnt = 0;
for(let i = 0; i < 4; i++) 
   for(let j = 0; j < 4; j++) {
    mat[i][j] = parinte.children[cnt++];
    mat[i][j].setAttribute('onclick', `intoarcere(${i}, ${j})`);
   }

//intoarce cartile si verifica daca e buna perechea
let intoarse = 0;
let Carte1;
let Carte2;
let l1, c1, l2, c2;
let win = 0;
function intoarcere(a, b) {
    mat[a][b].classList.toggle('intors');
    setTimeout( function() {
        mat[a][b].style.backgroundImage = "url('" + matPoze[a][b] + "')";
    }, 300 );
    intoarse++;//am intors o carte

   if( intoarse == 1 ) {
        Carte1 = matPoze[a][b];
        l1 = a;
        c1 = b;
   }
    else if( intoarse == 2 ) {
        Carte2 = matPoze[a][b];
        l2 = a;
        c2 = b;

        if( Carte2 == Carte1 ) {
            win++;
            setTimeout( function() {
                mat[l1][c1].style.opacity = '0';
                 mat[l2][c2].style.opacity = '0';

                 mat[l1][c1].removeAttribute('onclick');
                 mat[l2][c2].removeAttribute('onclick');

                 intoarse = 0;
            }, 1000);
        }else {
            setTimeout( function() {
                mat[l1][c1].classList.remove('intors');
                mat[l2][c2].classList.remove('intors');
                
                setTimeout(function() {
                    mat[l1][c1].style.backgroundImage = 'none';
                    mat[l2][c2].style.backgroundImage = 'none';
                }, 300);

                intoarse = 0;
            }, 1000);
        }
    }

    if( win == 8 ) {
        win = 0;
        let text = document.createElement('button');
        text.innerHTML = 'You WIN!';
        text.style.position = 'absolute';
        setTimeout(function() {
           document.body.appendChild(text);     
        } ,1000);

        setTimeout(function() {
            //refacem mat de poze
            text.remove();
            for(let i = 0; i < 4; i++)
                for(let j = 0; j < 4; j++)
                    matPoze[i][j] = 'liber';

                    for(let j = 0; j < 2; j++) {
                        for(let pic of poze) {
                    
                            do {
                                rand = Math.floor( Math.random() * 4 );
                                coloana = Math.floor( Math.random() * 4 );
                            }while( matPoze[rand][coloana] != 'liber' );
                        
                            matPoze[rand][coloana] = pic;
                        }
                    }

            //refacem mat cu cartile
            for(let i = 0; i < 4; i++) 
                for(let j = 0; j < 4; j++) {
                    mat[i][j].style.opacity = '1';
                    mat[i][j].style.backgroundImage = 'none';
                    mat[i][j].setAttribute.transition = '1s';
                    mat[i][j].classList.remove('intors');
                     mat[i][j].classList.remove('intors');
                    mat[i][j].setAttribute('onclick', `intoarcere(${i}, ${j})`);
                }
         } ,3000);
    }
}

console.log( matPoze );
