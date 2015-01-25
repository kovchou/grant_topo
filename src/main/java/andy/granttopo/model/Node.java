package andy.granttopo.model;


import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created by andy on 1/1/15.
 */
@Entity
@Table(name = "node")
public class Node extends Element {
    private Double posX;
    private Double posY;

    public Node() {
        this.setType(ElementType.NODE);
    }
    public Double getPosX() {
        return posX;
    }

    public void setPosX(Double posX) {
        this.posX = posX;
    }

    public Double getPosY() {
        return posY;
    }

    public void setPosY(Double posY) {
        this.posY = posY;
    }
}
