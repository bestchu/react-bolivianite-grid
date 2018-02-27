import * as React from 'react';
import Grid, {
    HeadersContainer, HeaderType, ICellRendererEvent, IHeaderRendererEvent, ISelectionRendererEvent
} from 'react-bolivianite-grid';
import Theme from './style';

export class SimpleGridExample extends React.Component {
    state = {
        headers: new HeadersContainer({
            columns: new Array(100).fill(null).map(() => ({})),
            rows: new Array(200).fill(null).map(() => ({})),
            columnWidth: 100,
            rowHeight: 24,
            headersHeight: 24,
            headersWidth: 50
        })
    };

    excelIndex(index: number) {
        index++;
        let c = '';

        for (let a = 1, b = 26; (index -= a) >= 0; a = b, b *= 26) {
            c = String.fromCharCode(~~((index % b) / a) + 65) + c;
        }

        return c;
    }

    renderCell = ({ style, columnIndex, rowIndex, theme }: ICellRendererEvent) => {
        return (
            <div
                style={{
                    ...style,
                    ...theme.cellStyle,
                    background: rowIndex % 2 ? theme.cellBackgroundEven : theme.cellBackgroundOdd
                }}
            >
                {`${rowIndex} x ${columnIndex}`}
            </div>
        );
    }

    renderHeader = ({ style, type, selection, viewIndex, theme }: IHeaderRendererEvent) => {
        const nextStyle: React.CSSProperties = {
            ...style,
            ...theme.headerStyle,
            borderRightColor: type === HeaderType.Row && selection ? theme.headerBorderColorSelected : theme.headerBorderColor,
            borderBottomColor: type === HeaderType.Column && selection ? theme.headerBorderColorSelected : theme.headerBorderColor
        };

        if (selection) {
            nextStyle.background = theme.headerBackgroundColorSelected;
        }

        if (type === HeaderType.Row) {
            nextStyle.justifyContent = 'flex-end';
        }

        return (
            <div style={nextStyle}>
                {
                    type === HeaderType.Column && viewIndex != null
                        ? this.excelIndex(viewIndex)
                        : viewIndex
                }
            </div>
        );
    }

    renderSelection = ({ key, style, active, edit, theme }: ISelectionRendererEvent) => {
        style.left--;
        style.top--;
        style.width++;
        style.height++;

        return (
            <div
                key={key}
                style={{
                    ...style,
                    boxSizing: 'border-box',
                    backgroundColor: (active || edit) ? theme.selectionBackgroundActive : theme.selectionBackground,
                    border: active ? theme.selectionBorderActive : theme.selectionBorder
                }}
            />
        );
    }

    render() {
        return (
            <Grid
                readOnly
                headers={this.state.headers}
                overscanRows={3}
                source={null}
                theme={Theme}
                onRenderCell={this.renderCell}
                onRenderHeader={this.renderHeader}
                onRenderSelection={this.renderSelection}
            />
        );
    }
}

export default SimpleGridExample;
