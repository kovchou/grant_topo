package andy.granttopo.model;


/**
 * Created by andy on 1/1/15.
 */
public class Piece {
    private Position startPoint;
    private Position endPoint;

    public Position getStartPoint() {
        return startPoint;
    }

    public void setStartPoint(Position startPoint) {
        this.startPoint = startPoint;
    }

    public Position getEndPoint() {
        return endPoint;
    }

    public void setEndPoint(Position endPoint) {
        this.endPoint = endPoint;
    }
}
