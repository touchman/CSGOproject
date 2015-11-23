import java.util.ArrayList;
import java.util.ListIterator;

public class MergeLists {
    public static void main(String[] args) {

        ArrayList<Integer> a = new ArrayList<Integer>();
        ArrayList<Integer> b = new ArrayList<Integer>();


        for (int i = 0; i <1000000 ; i++) {
            a.add(i);
            b.add(i);
        }


        /*Long s =  System.currentTimeMillis();
        merge(a, b);
        Long e = System.currentTimeMillis();
        System.out.println(a.toString());
        System.out.println(e-s);*/

        Long s =  System.currentTimeMillis();
        secMerge(a, b);
        Long e = System.currentTimeMillis();
        System.out.println(a.size());
        System.out.println(e-s);
    }

    public static void merge(ArrayList a, ArrayList b){
        int s = 1;
        for (int i = 0; i < b.size() ; i++) {
            a.add(s, b.get(i));
            s+=2;
        }
    }
    public static void secMerge(ArrayList a, ArrayList b){
        ArrayList c = new ArrayList();
        int s = 0;
        for (int i = 0; i <a.size()+b.size() ; i+=2) {
            c.add(i, a.get(s));
            c.add(i+1, b.get(s));
            s++;
        }
        for (int i = 0; i <b.size() ; i++) {
            a.add(0);
        }

        ListIterator di=a.listIterator();
        ListIterator si=c.listIterator();
        for (int i=0; i<c.size(); i++) {
            di.next();
            di.set(si.next());
        }
    }
}

/*for (Object o : b) {
            a.add(s, o);
            s+=2;
        }*/

/*
Функция принимает два ArrayList одинакового размера
[a1, a2, ..., an], [b1, b2, ..., bn]. В результате выполнения функции в первом
(!) ArrayList (в данном случае это А) должны содержаться элементы обоих
ArrayList, которые чередуются последовательно, а именно [a1, b1, a2, b2, ..., an, bn]*/
