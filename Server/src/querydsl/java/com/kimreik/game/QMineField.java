package com.kimreik.game;

import static com.mysema.query.types.PathMetadataFactory.*;

import com.mysema.query.types.path.*;

import com.mysema.query.types.PathMetadata;
import javax.annotation.Generated;
import com.mysema.query.types.Path;
import com.mysema.query.types.path.PathInits;


/**
 * QMineField is a Querydsl query type for MineField
 */
@Generated("com.mysema.query.codegen.EmbeddableSerializer")
public class QMineField extends BeanPath<MineField> {

    private static final long serialVersionUID = 500023714L;

    public static final QMineField mineField = new QMineField("mineField");

    public final SetPath<Point, QPoint> field = this.<Point, QPoint>createSet("field", Point.class, QPoint.class, PathInits.DIRECT2);

    public final NumberPath<Integer> height = createNumber("height", Integer.class);

    public final NumberPath<Integer> minesCount = createNumber("minesCount", Integer.class);

    public final NumberPath<Integer> width = createNumber("width", Integer.class);

    public QMineField(String variable) {
        super(MineField.class, forVariable(variable));
    }

    public QMineField(Path<? extends MineField> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMineField(PathMetadata<?> metadata) {
        super(MineField.class, metadata);
    }

}

