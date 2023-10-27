package pkg03des;

import java.security.*;
import javax.crypto.*;
import java.io.*;

public class Main {
    
    public static void main(String[] args) throws Exception{
        //  Vamos a cargar un archivo para cifrar
        if(args.length != 1){
            mensajeAyuda();
            System.exit(1);
        }
        
        System.out.println("1.- Generar la clave Des");
        
        //Vamos a ocupar la clave KeyGenerator
        KeyGenerator generadorDES = KeyGenerator.getInstance("DES");
        
        //DEBO definir elñ tamaño de la clave
        generadorDES.init(56);
        
        //Generamos la clave secreta
        SecretKey clave = generadorDES.generateKey();
        
        System.out.println("Veamos la clave" + clave);
        mostrarBytes(clave.getEncoded());
        System.out.println("");
        
        //Definir los elementos para cifrar
        /*
        DES es un cifrado por bloeques, que tenemos que dar reglas de como se 
        va a manejar el bloque Modo Cifrado ECB (Electronic Code Book)
        Estandar PKCS5Padding
        */
        
        System.out.println("2.- Cifrar con DES el archivo " + args[0] + " , generamos el resultado en " + args[0] + ".cifrado");
        
        //Lo feo a cifrar
        Cipher cifrador = Cipher.getInstance("DES/ECB/PKCS5Padding");
        
        //Ciframos
        cifrador.init(Cipher.ENCRYPT_MODE, clave);
        
        //Leer el archivo y definir de cuantro en cuanto bytes de lectura
        byte[] buffer = new byte[1000];
        
        byte[] bufferCifrado;
        
        FileInputStream in = new FileInputStream(args[0]);
        FileOutputStream out = new FileOutputStream(args[0] + ".cifrado");
        
        //Leo cada archivo
        int bytesleidos = in.read(buffer, 0, 1000);
        while(bytesleidos != -1){
            //Que no he terminado de leer el archivo
            bufferCifrado = cifrador.update(buffer, 0, bytesleidos);
            bytesleidos = in.read(buffer,0, bytesleidos);
        }
        bufferCifrado = cifrador.doFinal();
        out.write(bufferCifrado);
        
        in.close();
        out.close();
        
        System.out.println("Vamos a descifrar el archivo " + args[0] + ".cifrado" + " , y el resultado está en " + args[0] + ".descifrado");
        
        //Ciframos
        cifrador.init(Cipher.DECRYPT_MODE, clave);
        
        //Leer el archivo y definir de cuantro en cuanto bytes de lectura
        
        byte[] bufferPlano;
        
        in = new FileInputStream(args[0]);
        out = new FileOutputStream(args[0] + ".cifrado");
        
        //Leo cada archivo
        bytesleidos = in.read(buffer, 0, 1000);
        while(bytesleidos != -1){
            //Que no he terminado de leer el archivo
            bufferPlano = cifrador.update(buffer, 0, bytesleidos);
            bytesleidos = in.read(buffer,0, bytesleidos);
        }
        bufferPlano = cifrador.doFinal();
        out.write(bufferPlano);
        
        in.close();
        out.close();
        
    }

    public static void mensajeAyuda() {
        System.out.println("Ejemplo de cifrado DES");
        System.out.println("Debe tener afuerzas un archivo cargado");
    }

    private static void mostrarBytes(byte[] buffer) {
        System.out.write(buffer, 0, buffer.length);
    }
  
}
