package andy.granttopo.model;

import java.util.*;

/**
 * Created by andy on 1/1/15.
 */
public class TopoCache {
    TreeMap<Double, Element> posX2ElementMap = new TreeMap<Double, Element>();
    TreeMap<Double, Element> posY2ElementMap = new TreeMap<Double, Element>();

    public void addElements(Set<Element> elements) {


        for (Element element : elements) {
            if (element instanceof Node) {
                posX2ElementMap.put(((Node) element).getPosX(), element);
                posY2ElementMap.put(((Node) element).getPosY(), element);
            }
        }
    }
    public Set<Element> getElementsInPiece(Piece piece) {
        Set<Element> elementsInPiece = new HashSet<Element>();

        Position endPoint = piece.getEndPoint();
        Position startPoint = piece.getStartPoint();
        Double startX = startPoint.getX();
        Double endX = endPoint.getX();
        Double startY = startPoint.getY();
        Double endY = endPoint.getY();

        NavigableMap<Double, Element> elementInPieceXDimension = posX2ElementMap.subMap(startX, true, endX, true);
        for (Map.Entry<Double, Element> elementEntry : elementInPieceXDimension.entrySet()) {
            Element element = elementEntry.getValue();
            if(element instanceof Node){
                Double y = ((Node) element).getPosY();
                if (y >= startY && y <= endY) {
                    elementsInPiece.add(element);
                }
            }
        }
        return elementsInPiece;
    }

    public Set<Element> getAllElements() {
        return new HashSet<Element>(posX2ElementMap.values());
    }
}
