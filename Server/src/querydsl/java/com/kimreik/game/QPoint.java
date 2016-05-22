package com.kimreik.game;

import static com.mysema.query.types.PathMetadataFactory.*;

import com.mysema.query.types.path.*;

import com.mysema.query.types.PathMetadata;
import javax.annotation.Generated;
import com.mysema.query.types.Path;


/**
 * QPoint is a Querydsl query type for Point
 */
@Generated("com.mysema.query.codegen.EmbeddableSerializer")
public class QPoint extends BeanPath<Point> {

    private static final long serialVersionUID = 719758411L;

    public static final QPoint point = new QPoint("point");

    public final NumberPath<Integer> value = createNumber("value", Integer.class);

    public final NumberPath<Integer> x = createNumber("x", Integer.class);

    public final NumberPath<Integer> y = createNumber("y", Integer.class);

    public QPoint(String variable) {
        super(Point.class, forVariable(variable));
    }

    public QPoint(Path<? extends Point> path) {
        super(path.getType(), path.getMetadata());
    }

    public QPoint(PathMetadata<?> metadata) {
        super(Point.class, metadata);
    }

}

