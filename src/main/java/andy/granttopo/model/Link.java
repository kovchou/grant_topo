package andy.granttopo.model;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created by andy on 1/1/15.
 */
@Entity
@Table(name = "link")
public class Link extends Element {
    public Link(){
        this.setType(ElementType.LINK);
    }
}
