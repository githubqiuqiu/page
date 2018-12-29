package com.wonders.page;

public class Test {
    public static void main(String[] args) {
        String s1="test";
        String s2="test";

        //方法区地址
        System.out.println(s1==s2);
        System.out.println(s1.equals(s2));

        //堆地址 每次都新建一个
        String s3=new String("test");
        String s4=new String("test");
        System.out.println(s1==s3);
        System.out.println(s1.equals(s3));

        System.out.println(s3==s4);
        System.out.println(s3.equals(s4));
    }
}
